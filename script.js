// script.js
document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll(".video");
    const videoDurations = [10, 10, 10, 10, 10, 10]; // Duration in seconds for each video
    const playbackRate = 0.5; // Slow motion effect (0.5 means half the normal speed)
    let currentVideoIndex = 0;
    let timer;
  
    function playNextVideo() {
      videos[currentVideoIndex].classList.remove("active");
      videos[currentVideoIndex].playbackRate = 1; // Reset to normal speed for fade-out
      setTimeout(() => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        videos[currentVideoIndex].classList.add("active");
        videos[currentVideoIndex].play();
        videos[currentVideoIndex].playbackRate = playbackRate; // Set to slow motion speed
        setVideoTimer();
      }, 1000); // Delay to allow fade out before switching
    }
  
    function setVideoTimer() {
      clearTimeout(timer);
      timer = setTimeout(playNextVideo, (videoDurations[currentVideoIndex] * 1000 / playbackRate) - 1000); // Adjust for slow motion and fade out time
    }
  
    // Start with the first video
    videos[currentVideoIndex].classList.add("active");
    videos[currentVideoIndex].play();
    videos[currentVideoIndex].playbackRate = playbackRate; // Set to slow motion speed
    setVideoTimer();
  });
  