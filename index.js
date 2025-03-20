const loaderContainer = document.getElementById('loader');
const videosContainer = document.getElementById('videos');
const searchForm = document.getElementById('search-form');
const clearBtn = document.getElementById('clear');

let videos = [];
let filterToggle = false;

async function fetchVideos() {
  try {
    const res = await fetch(
      'https://api.freeapi.app/api/v1/public/youtube/videos',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();

    videos = data.data.data;

    generateVideoCards(videos);

    loaderContainer.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

function generateVideoCards(videos) {
  videos.map((video) => {
    const videoContainer = document.createElement('a');
    videoContainer.classList =
      'group overflow-hidden bg-slate-800 hover:bg-slate-700 text-white w-full h-full rounded cursor-pointer';
    videoContainer.href = `https://www.youtube.com/watch?v=${video.items.id}`;
    videoContainer.target = '_blank';

    const videoImage = document.createElement('img');
    videoImage.src = video.items.snippet.thumbnails.high.url;
    videoImage.classList =
      'w-full h-48 object-cover rounded-t group-hover:scale-105 duration-300 transition-transform';
    videoContainer.appendChild(videoImage);

    const videoTitle = document.createElement('p');
    videoTitle.textContent = video.items.snippet.title;
    videoTitle.classList = 'text-lg font-bold px-2 pt-2';
    videoContainer.appendChild(videoTitle);

    const channelName = document.createElement('p');
    channelName.textContent = video.items.snippet.channelTitle;
    channelName.classList = 'text-sm px-2';
    videoContainer.appendChild(channelName);

    const stats = document.createElement('p');
    stats.textContent = `${video.items.statistics.viewCount} views • ${video.items.statistics.likeCount} likes`;
    stats.classList = 'mt-4 text-sm px-2';
    videoContainer.appendChild(stats);

    const publishedAt = document.createElement('p');
    publishedAt.textContent = `Published At: ${new Date(
      video.items.snippet.publishedAt
    ).toLocaleDateString()}`;
    publishedAt.classList = 'text-sm px-2 pb-4';
    videoContainer.appendChild(publishedAt);

    const tags = video.items.snippet.tags || [];

    videosContainer.appendChild(videoContainer);
  });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;

  if (query.length < 3) {
    alert('Please enter at least 3 characters');
    return;
  }

  if (query) {
    videosContainer.innerHTML = '';
    const filteredVideos = videos.filter((video) =>
      video.items.snippet.title.toLowerCase().includes(query.toLowerCase())
    );
    generateVideoCards(filteredVideos);
    filterToggle = true;
    clearBtn.style.display = 'block';
  }
});

clearBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';
  clearBtn.style.display = 'none';
  videosContainer.innerHTML = '';
  generateVideoCards(videos);
  filterToggle = false;
});

fetchVideos();
