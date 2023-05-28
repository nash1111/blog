---
title: How to create AWS cost notificator
date: '2023-05-28'
tags: ["TypeScript", "AWS", "Lambda"]
locale: "en"
---
Working with AWS is exciting and enriching, but one aspect that can easily be overlooked in the day-to-day hustle is managing costs. Keeping track of your AWS spending often involves logging into your AWS Management Console and manually checking the cost management page, which can be a hassle.

That's why I built an AWS cost notification bot using AWS CDK (Cloud Development Kit) that sends daily updates about your AWS costs directly to your Slack workspace. The completed project is available on my [GitHub](https://github.com/nash1111/aws_billing_lambda) repository, but in this post, I'll take you through the steps of creating your own.

#### Step 0: Prepare CDK, AWS CLI, and generate slackWebhookUrl
```
❯ cdk --version
2.81.0 (build bd920f2)
❯ aws --version
aws-cli/2.11.2 Python/3.11.2
```

#### Step1: Create a new AWS CDK Project
```
mkdir aws_billing_lambda
cd aws_billing_lambda
cdk init app --language typescript
```

#### Stpe2: add library for CDK
```
yarn add aws-cdk-lib aws-sdk axios @slack/webhook
```

#### Step3: put your SlackWebhookUrl to SSM
```bash
aws ssm put-parameter \
--name "/billing_lambda_app/slackWebhookUrl" \
--value "[Your SlackWebhookUrl]" --type "SecureString"
```

#### Step4: Grant the Necessary Permissions to Lambda (lib/aws_billing_lambda-stack.ts)
setup handler
```typescript
    const billingLambda = new NodejsFunction(this, "BillingLambda", {
      entry: "./lambda/index.ts",
      handler: "handler",
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });
```
set ssm policy to load slackWebhookUrl
```typescript
    const ssmPolicy = new iam.PolicyStatement({
      actions: ["ssm:GetParameter"],
      resources: ["arn:aws:ssm:*:*:parameter/billing_lambda_app/*"],
    });
    billingLambda.addToRolePolicy(ssmPolicy);
```
set kms policy, this is necessary for decrypt
```typescript
    const kmsPolicy = new iam.PolicyStatement({
      actions: ["kms:Decrypt"],
      resources: ["*"],
    });
    billingLambda.addToRolePolicy(kmsPolicy);
```
attach GetCostAndUsage policy
```typescript
    const cePolicy = new iam.PolicyStatement({
      actions: ["ce:GetCostAndUsage"],
      resources: ["*"],
    });
    billingLambda.addToRolePolicy(cePolicy);
```
set rule
```typescript
    const rule = new events.Rule(this, "BillingLambdaRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "4" }),
    });
```

#### Step5: load slackWebHookUrl from ssm (lambda/index.ts)
```
  const ssm = new AWS.SSM();
  const slackWebhookUrlParam = await ssm
    .getParameter({
      Name: "/billing_lambda_app/slackWebhookUrl",
      WithDecryption: true,
    })
    .promise();
  const slackWebhookUrl = slackWebhookUrlParam.Parameter?.Value || "";
```

#### Step6: Load AWS cost and send to Slack (lambda/index.ts)
```typescript
  const params: AWS.CostExplorer.Types.GetCostAndUsageRequest = {
    TimePeriod: {
      Start: firstDayOfMonth.toISOString().substring(0, 10),
      End: today.toISOString().substring(0, 10),
    },
    Granularity: "MONTHLY",
    Metrics: ["UnblendedCost"],
  };

  const data = await costExplorer.getCostAndUsage(params).promise();

  if (data && data.ResultsByTime && data.ResultsByTime[0]) {
    const amount = data.ResultsByTime[0].Total?.UnblendedCost.Amount;
    console.log(`Total cost for the month so far: $${amount}`);

    const message = `Total cost for the month so far: $${amount}`;
    await webhook.send({
      text: message,
    });
  } else {
    console.log("No cost data available");
  }
```

#### Step7: Deploy
```
cdk deploy
```

![slackbot.png](/blog/slackbot.png) 