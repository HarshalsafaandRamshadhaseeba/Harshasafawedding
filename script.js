
document.addEventListener("DOMContentLoaded", function () {

  const welcomePage = document.getElementById("welcomePage");
  const mainWebsite = document.getElementById("mainWebsite");
  const enterButton = document.getElementById("enterButton");

  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");

  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  // COUNTDOWN: 15 NOVEMBER 2026, 11 AM IST
  const weddingDate = new Date(
    "2026-11-15T11:00:00+05:30"
  ).getTime();

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const countdownTimer = document.getElementById("countdownTimer");
  const finishedMessage = document.getElementById("countdownFinished");

  function updateCountdown() {

    const now = Date.now();
    const difference = weddingDate - now;

    if (difference <= 0) {

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      countdownTimer.style.display = "none";
      finishedMessage.hidden = false;

      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();

  const countdownInterval = setInterval(updateCountdown, 1000);


  // OPEN INVITATION
  enterButton.addEventListener("click", async function () {

    welcomePage.classList.add("hide");

    setTimeout(function () {

      welcomePage.style.display = "none";
      mainWebsite.classList.add("show");
      musicButton.classList.add("visible");

      revealSections();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 900);

    // Start music after visitor clicks
    try {

      await music.play();
      musicButton.classList.add("playing");

    } catch (error) {

      console.log("Please press the music button to start music.");

    }

  });


  // MUSIC BUTTON
  musicButton.addEventListener("click", async function () {

    if (music.paused) {

      try {

        await music.play();
        musicButton.classList.add("playing");

      } catch (error) {

        console.log("Music playback failed.");

      }

    } else {

      music.pause();
      musicButton.classList.remove("playing");

    }

  });


  // MOBILE MENU
  menuToggle.addEventListener("click", function () {

    navigation.classList.toggle("active");

  });


  // CLOSE MOBILE MENU
  document.querySelectorAll(".navigation a").forEach(function (link) {

    link.addEventListener("click", function () {

      navigation.classList.remove("active");

    });

  });


  // SCROLL ANIMATIONS
  function revealSections() {

    const sections = document.querySelectorAll(".section-reveal");

    const observer = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });

    sections.forEach(function (section) {

      observer.observe(section);

    });

  }

});
