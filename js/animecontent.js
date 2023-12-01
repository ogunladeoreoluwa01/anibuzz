/** @format */
const queryParams = new URLSearchParams(window.location.search);
const animeId = queryParams.get('id');

// Now, 'animeId' contains the extracted data-id value
console.log(animeId);

const url = "https://graphql.anilist.co/query";
const query = `
query ($id:Int,$type:MediaType){
    Media  (id: $id, type:$type isAdult: false){
      id
      title {
        userPreferred
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      description
      season
      seasonYear
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      synonyms
      source(version: 3)
      isAdult
      isLocked
      meanScore
      averageScore
      popularity
      favourites
      isFavouriteBlocked
      hashtag
      countryOfOrigin
      isLicensed
      isFavourite
      isRecommendationBlocked
      isReviewBlocked
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      relations {
        edges {
          id
          relationType(version: 2)
          node {
            id
            title {
              userPreferred
            }
            format
            type
            status(version: 2)
            bannerImage
            coverImage {
              large
            }
          }
        }
      }
      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
        edges {
          id
          role
          name
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
        edges {
          id
          role
          node {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
      }
      studios {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
      reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {
        pageInfo {
          total
        }
        nodes {
          id
          summary
          rating
          ratingAmount
          user {
            id
            name
            avatar {
              large
            }
          }
        }
      }
      recommendations(perPage: 7, sort: [RATING_DESC, ID]) {
        pageInfo {
          total
        }
        nodes {
          id
          rating
          userRating
          mediaRecommendation {
            id
            title {
              userPreferred
            }
            format
            type
            status(version: 2)
            bannerImage
            coverImage {
              large
            }
          }
          user {
            id
            name
            avatar {
              large
            }
          }
        }
      }
      externalLinks {
        id
        site
        url
        type
        language
        color
        icon
        notes
        isDisabled
      }
      streamingEpisodes {
        site
        title
        thumbnail
        url
      }
      trailer {
        id
        site
      }
      rankings {
        id
        rank
        type
        format
        year
        season
        allTime
        context
      }
      tags {
        id
        name
        description
        rank
        isMediaSpoiler
        isGeneralSpoiler
        userId
      }
      mediaListEntry {
        id
        status
        score
      }
      stats {
        statusDistribution {
          status
          amount
        }
        scoreDistribution {
          score
          amount
        }
      }
    }
  }
  

`;

// Define variables, including the perPage variable
const variables = {
	id: animeId,
	type: "ANIME",
	// You can adjust this value based on your requirements
};

// Now you can use this query and variables in your GraphQL request

fetch(url, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		client: "15430",
		client_secret: "0LDTy3O2LhkXP7UdgcRWH3OkD7Vr2df1daKZAmau",
		query: query,
		variables: variables,
	}),
})
	.then((response) => response.json())
	.then((json) => {
		console.log(json);
		const media = json.data.Media;
		console.log(media);
		console.log(media.relations);

		const genres = media.genres;
		const genreElements = genres
			.map(
				(genre) => `
<a href="#" class="genres" style="background-color:${media.coverImage.color} ;" data-id="${genre}"> ${genre}</a>
`
			)
			.join("");

      const relationsObj = media.relations;

// Check if relationsObj is an object before using Object.entries
const relationElements = typeof relationsObj === 'object' && relationsObj !== null
  ? Object.values(relationsObj).map((relation) => `
    <div class="relationCard">
      <a href="#" data-id="${media.id}">
        <img src="${media.coverImage.large}" alt="" class="relationimg">
      </a>
      <div class="relationText">
        <h3>${media.title.userPreferred}</h3>
        <p>${media.format}-${relation.someProperty}: ${relation.someValue}</p>
        <!-- Replace 'someProperty' and 'someValue' with the actual properties of your 'relation' object -->
      </div>
    </div>
  `).join("")
  : ""; // Empty string if relationsObj is not an object


		const page = `

<div class="banneImg" style="background-color:${media.coverImage.color}>
<img class=" banneImage" src=${media.bannerImage} alt="">
</div>


<section class="animesection">
<div class="aboutsection">
    <div class="mainimg">
        <img src="${media.coverImage.large}" alt="" class="mainimg">
    </div>
    <div class="gener">
    ${genreElements}


    </div>
</div>

<div class="textinfo">
    <h1>${media.title.userPreferred}</h1>
    <p class="descriptiontext">${media.description}</p>
</div>

</section>
<h1 class="tittle">Information</h1>
<section class="allinfo">
<div class="sidebar">
    <div class="topbar">
    </div>
    <div class="infobar">
        <h3>Airing:</h3>
    </div>
    <div class="infobar">
        <h3>Format:${media.format}</h3>
    </div>
    <div class="infobar">
        <h3>Episodes:${media.episodes}</h3>
    </div>
    <div class="infobar">
        <h3>Episode:</h3>
    </div>
    <div class="infobar">
        <h3>Status:${media.status}</h3>
    </div>
    <div class="infobar">
        <h3>Start Date:${media.startDate}</h3>
    </div>
    <div class="infobar">
        <h3>End Date:${media.endDate}</h3>
    </div>
    <div class="infobar">
        <h3>Average Score:${media.averageScore}</h3>
    </div>
    <div class="infobar">
        <h3>Mean Score:${media.meanScore}</h3>
    </div>
    <div class="infobar">
        <h3>Popularity:</h3>
    </div>
    <div class="infobar">
        <h3>Favorites:</h3>
    </div>
    <div class="infobar">
        <h3>Studios:</h3>
    </div>
    <div class="infobar">
        <h3>Hashtag:${media.hashtag}</h3>
    </div>
    <div class="infobar">
        <h3>Source:</h3>
    </div>
    <div class="infobar">
        <h3>Romaji:${media.title.romaji}</h3>
    </div>
    <div class="infobar">
        <h3>English:${media.title.english}</h3>
    </div>
    <div class="infobar">
        <h3>Native:${media.title.native}</h3>
    </div>

    <div class="lastbar">
    </div>

</div>

<div class="mainbar">
    <div class="relations">
        <h4 class="descriptText">Relations</h4>
        <div class="cards">

        ${relationElements}
        </div>
</section>

















`;
document
				.querySelector("nav")
				.insertAdjacentHTML("afterend",page);
	})

	.catch((error) => {
		const errorMessage = "Error fetching AniList trending anime:";

		console.error(errorMessage, error);
	});
