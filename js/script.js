const fetchJobPostIDs = async () => {
    try {
        const data = await fetch(
            "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const jobIDs = await data.json();
        return jobIDs;
    } catch (err) {
        console.error("Error occured while fetching job post IDs:", err);
    }
};

const fetchJobPost = async (jobID) => {
    try {
        const data = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${jobID}.json`
        );
        const jobPost = await data.json();
        return jobPost;
    } catch (err) {
        console.error("Error occured while fetching job post:", err);
    }
};

async function displayJobs(index = 0, count = 9) {
    const jobIds = await fetchJobPostIDs();

    const jobsPosts = jobIds.slice(index, index + count).map(fetchJobPost);

    const jobs = await Promise.all(jobsPosts);

    jobs.forEach((job) => {
        const companyName = job.title.split("Is hiring")[0].trim();
        const desc = job.title;
        const date = new Date(job.time * 1000).toLocaleDateString();
        const jobUrl =
            job.url || `https://news.ycombinator.com/item?id=${job.id}`;

        document.getElementById("job-posts").innerHTML += `
            <div class="job-card" onclick="window.open('${jobUrl}', '_blank')">
                <h3>${companyName}</h3>
                <p>${desc}</p>
                <p>${date}</p>
            </div>
        `;
    });
}

let index = 9;
document.getElementById("load-more").addEventListener("click", () => {
    displayJobs(index, 6);
    index += 6;
});

displayJobs(0, 9);