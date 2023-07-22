import React from "react";
import { Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

const TweetButton = () => {
  const tweet = () => {
    const url = window.location.href;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      url
    )}`;
    window.open(tweetURL, "_blank");
  };

  return (
    <Button
      startIcon={<TwitterIcon />}
      onClick={tweet}
      variant="contained"
      color="primary"
    >
      Tweet this page
    </Button>
  );
};

export default TweetButton;
