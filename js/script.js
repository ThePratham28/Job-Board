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
    }
    catch (err) {
        console.error("Error occured while fetching job post:", err);
    }
}

//   {
//     by: 'TheBengaluruGuy',
//     id: 43043441,
//     score: 1,
//     time: 1739494807,
//     title: 'Doctor Droid (YC W23) Is Hiring a Back End Engineer',        
//     type: 'job',
//     url: 'https://www.ycombinator.com/companies/doctor-droid/jobs/F0iI9UU-backend-engineer-assignment-in-description'
//   },

const displayJobPosts = async (index = 0, posts = 9) => {
    const jobIDs = await fetchJobPostIDs();
    const jobPosts = [];
    for (let i = index; i < index + posts; i++) {
        const jobPost = await fetchJobPost(jobIDs[i]);
        jobPosts.push(jobPost);
    }

    jobPosts.forEach((post) => {
        const jobPost = document.getElementById("job-posts").innerHTML +=  `
        <div class="job-card" onclick="window.open('${post.url}', '_blank')">
            <h3>${post.title}</h3>
            <p>${time}
            `
        
    });
            
}









