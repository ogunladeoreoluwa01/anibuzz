/** @format */

const url = "https://graphql.anilist.co/query";
const query = `
query($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
    trending: Page(page: 1, perPage: 5) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: 5) {
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: 5) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 5) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: 10) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }

  fragment media on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
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
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    mediaListEntry {
      id
      status
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }

`;

// Define variables, including the perPage variable
const variables = {
	perPage: 6, // You can adjust this value based on your requirements
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
		variables,
	}),
})
	.then((response) => response.json())
	.then((json) => {
		const media2 = json.data.trending.media;
		const medias = json.data.season.media;

		let carosel = "";
		let card1 = "";

		medias.forEach((element, index) => {
			carosel = `<div class="heroCaroselInfo ${
				index !== 0 ? "invisible" : ""
			}" id="carousel">
            <div class="caroselImg">
              <img src="${element.bannerImage.toString()}" alt="">
            </div>
            <div class="heroinfo">
              <div class="heroName">
                <h1><span style="color:${element.coverImage.color};">[</span>${
				element.title.userPreferred
			}<span style="color:${element.coverImage.color};">]</span></h1>
                <div class="cardRanking">
                </div>
              </div>
              <div class="heroSynopsisPeek">
                <h1>Synopsis</h1>
                <p>${element.description.toString()}</p>
              </div>
              <button class="mainBtn herobtn">See more</button>
            </div>
          </div>`;
			document
				.querySelector(".heroCarosel")
				.insertAdjacentHTML("beforeend", carosel);
		});

		media2.forEach((e) => {
			card1 = ` <div class="cardContainer" id="trending">
	<div class="card">
		<div class="first-content">
			<img src="${e.coverImage.large}" alt="" srcset="">
		</div>
	</div>
	<div class="cardName">
		<p>${e.title.userPreferred} </p>
	</div>
</div>`;

			document
				.querySelector(".showCaseAnime")
				.insertAdjacentHTML("beforeend", card1);
		});
	})
	.catch((error) => {
		const errorMessage = "Error fetching AniList trending anime:";

		console.error(errorMessage, error);
	});

const buttons = document.querySelectorAll(".btn"); // Declare buttons as const
let currentCarouselIndex = 0;

const handleCarousel = (index) => {
	const carousels = document.querySelectorAll(".heroCaroselInfo"); // No need to reassign buttons
	console.log(index, carousels.length);

	buttons.forEach((btn) => {
		btn.classList.remove("caroActive");
	});

	buttons[index].classList.add("caroActive");

	carousels.forEach((carousel) => {
		carousel.classList.add("invisible");
	});

	carousels[index].classList.remove("invisible");
};

const startTimer = () => {
	const carousels = document.querySelectorAll(".heroCaroselInfo"); // No need to reassign buttons

	setInterval(() => {
		currentCarouselIndex = (currentCarouselIndex + 1) % carousels.length;
		handleCarousel(currentCarouselIndex);
	}, 100000000000000000000); // Set the time interval here (in milliseconds)
};

buttons.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		handleCarousel(index);
	});
});

startTimer();
