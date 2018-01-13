# LIRI
# Language Interpretation Recognition Interface

LIRI is a command line interface for node.  Taking input from user prompts, LIRI will search, spotify, OMDB, and Twitter returning song data, movie data, and recent tweets.

## Getting Started

*Note: This assumes that you already have Node.js installed locally.*

1. Clone the repo to your local machine. [Git Repo](https://github.com/iangoodnight/LIRI.git)
1. Run ```npm install``` to get required packages.
1. You will need to provide your own ```.env``` file with Twitter and Spotify API keys.
	```
	# Spotify API keys (replace with your key/secret)
	SPOTIFY_ID=your-spotify-id
	SPOTIFY_SECRET=your-spotify-secret
	# Twitter API keys (replace with your keys/secrets)
	TWITTER_CONSUMER_KEY=your-twitter-consumer-key
	TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
	TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
	TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
	```

1. From the root folder, run LIRI!



