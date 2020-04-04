function searchVideo(name) {
    let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDAybtAItlgjfW7-goM0XmxTWBkOv2Y0HY"+
        "&type=video&part=snippet&maxResults=10&q="+name;
    let settings = {
        method : 'GET'
    };

    fetch(url, settings)
        .then( response => {
            if(response.status === 200){
                return response.json();
            }
            else throw new Error("Error on search query!");
        })
        .then(list => {
            let container = document.querySelector( '.videoResults' );

            let videos = "";

            for (let i in list.items){
                let item = list.items[i];

                videos +=
                    `
                      <li class="listItem">
                        <a href="https://www.youtube.com/watch?v=`+ item.id.videoId +`"
                        class="videoThumbnail" target="_blank">`+ item.snippet.title +`</a>
                        <a href="https://www.youtube.com/watch?v=`+ item.id.videoId +`"
                        class="videoThumbnail" target="_blank">
                        <img src="`+ item.snippet.thumbnails.default.url +`" alt="thumbnail" class="videoThumbnail"/></a>
                      </li>
                    `
            }

            container.innerHTML = videos;
        });
}

function subForm() {
    let form = document.querySelector(".getVideos");

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        searchVideo(form.querySelector('#videoName').value);
    });
}

function inti() {
    subForm();
}

inti();