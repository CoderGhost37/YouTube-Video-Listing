const loaderContainer = document.getElementById('loader');
const videosContainer = document.getElementById('videos');

let videos = [];

async function fetchVideos(query = '') {
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

    if (!query) {
      videos = data.data.data;
      console.log(videos);

      videos.map((video) => {
        const videoContainer = document.createElement('div');
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

    loaderContainer.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

fetchVideos();
