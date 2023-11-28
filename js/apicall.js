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
	type: "ANIME",
	season: "FALL",
	seasonYear: 2022,
	nextSeason: "WINTER",
	nextYear: 2024,
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
		// const media5 = json.data.top.media
		const media5 = json.data.top.media;
		const medias4 = json.data.popular.media;
		const medias3 = json.data.nextSeason.media;
		const medias2 = json.data.trending.media;
		const medias = json.data.season.media;
		let carosel = "";
		let card1 = "";

		medias.forEach((element, index) => {
			carosel = `<div class="heroCaroselInfo ${
				index !== 0 ? "invisible" : ""
			}" id="carousel" data-id="${element.id}">
            <div class="caroselImg" >
              <img src="${
								element.coverImage.extraLarge
							}" alt="" style="border-top: 0.25rem solid ${
				element.coverImage.color
			}; border-left: 0.25rem solid ${element.coverImage.color};"
              ;">
            </div>
            <div class="heroinfo" style="border-bottom: 0.25rem solid ${
							element.coverImage.color
						}; border-right: 0.25rem solid ${element.coverImage.color};"
            >
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
              <button class="darkBtn herobtn" data-id="${
								element.id
							}" >See more</button>
            </div>
          </div>`;
			document
				.querySelector(".heroCarosel")
				.insertAdjacentHTML("beforeend", carosel);
		});

		medias2.forEach((e) => {
			card1 = ` <div class="cardContainer" id="trending">
	<div class="card" data-id="${e.id}">
		<div class="first-content">
			<img src="${e.coverImage.large}" alt="${e.title.userPreferred}" srcset="">
		</div>
	</div>
	<div class="cardName">
		<p>${e.title.userPreferred} </p>
	</div>
</div>`;

			document
				.querySelector("#showCaseTrending")
				.insertAdjacentHTML("beforeend", card1);
		});
		medias3.forEach((elem2) => {
			card2 = `
      <div class="showCaseAnimeWhite">
      <div class="cardContainer" data-id="${elem2.id}">
          <div class="cardWhite">
              <div class="first-contentWhite">
                  <img src="${elem2.coverImage.large}" alt="${elem2.title.userPreferred}" srcset="">
              </div>
          </div>
          <div class="cardNameWhite">
              <p>${elem2.title.userPreferred} </p>
          </div>
      </div>

  </div>
      `;
			document
				.querySelector("#showCaseUpcoming")
				.insertAdjacentHTML("beforeend", card2);
		});
		medias4.forEach((e) => {
			card3 = ` <div class="cardContainer" id="trending">
	<div class="card" data-id="${e.id}">
		<div class="first-content">
			<img src="${e.coverImage.large}" alt="${e.title.userPreferred}" srcset="">
		</div>
	</div>
	<div class="cardName">
		<p>${e.title.userPreferred} </p>
	</div>
</div>`;
			document.querySelector("#Popular").insertAdjacentHTML("beforeend", card3);
		});

		let ranking = 0;

		media5.forEach((e) => {
			increment = ++ranking;

			const genres = e.genres;

			const genreElements = genres
				.map(
					(genre) => `
    <a href="#" style="background-color:${e.coverImage.color} ;" data-id="${genre}"> ${genre}</a>
  `
				)
				.join("");

			const topcard = `
  <div class="cardSection" data-id="${e.id}">
  <div class="ranking">

      <p class="rankingText" style="color: ${e.coverImage.color}";>#${increment}</p>
  </div>
  <div class="mainCard" style="border-bottom: 0.25rem solid ${e.coverImage.color}; border-right: 0.25rem solid ${e.coverImage.color};">
      <div class="leftsection">
          <div class="mainCardImgSection">
              <img src=${e.coverImage.large} alt=${e.title.userPreferred} class="maincardImg">
          </div>
          <div class="nameNdGener">
              <h3 class="animeName">${e.title.userPreferred}</h3>
              <div class="gener">
              ${genreElements}

              </div>
          </div>
      </div>
      <div class="rightsection">

          <div class="ratingemoji">
              <h3>${e.averageScore}%</h3>
              <i class="fa-regular fa-face-grin-hearts good  heart"></i>
              <i class="fa-regular fa-face-smile good invisible smile"></i>
              <i class="fa-regular fa-face-grin-beam-sweat average invisible grin"></i>
              <i class="fa-regular fa-face-sad-tear average invisible sad"></i>
              <i class="fa-regular fa-face-dizzy bad invisible dizzy"></i>

          </div>
          <div class="episodeinfo">
              <h3>${e.format}</h3>
              <h4>${e.episodes}episodes</h4>
          </div>
          <div class="seasonsinfo">
              <h3>${e.season},${e.seasonYear}</h3>
              <h4>${e.status}</h4>
          </div>
      </div>





  </div>




</div>






`;
			document
				.querySelector("#top100Container")
				.insertAdjacentHTML("beforeend", topcard);
		});
	})

	.catch((error) => {
		const errorMessage = "Error fetching AniList trending anime:";

		console.error(errorMessage, error);
	});

document.addEventListener("DOMContentLoaded", function () {
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
	buttons.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			handleCarousel(index);
		});
	});
});

// const startTimer = () => {
// 	const carousels = document.querySelectorAll(".heroCaroselInfo"); // No need to reassign buttons

// 	setInterval(() => {
// 		currentCarouselIndex = (currentCarouselIndex + 1) % carousels.length;
// 		handleCarousel(currentCarouselIndex);
// 	}, 100000000000000000000); // Set the time interval here (in milliseconds)
// };

// buttons.forEach((btn, index) => {
// 	btn.addEventListener("click", () => {
// 		handleCarousel(index);
// 	});
// });

// startTimer();
