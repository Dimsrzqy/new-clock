document.addEventListener("DOMContentLoaded", () => {
  $(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
  });

  const themeStylesheet = document.getElementById("theme");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    themeStylesheet.href = storedTheme;
  }
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    if (themeStylesheet.href.includes("light")) {
      themeStylesheet.href = "dark-theme.css";
    } else {
      themeStylesheet.href = "light-theme.css";
    }
    localStorage.setItem("theme", themeStylesheet.href);
  });

  function change() {
    $(window).on("load", function () {
      $(".loader-wrapper").fadeOut("slow");
    });

    const themeStylesheet = document.getElementById("theme");
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      themeStylesheet.href = storedTheme;
    }
    if (themeStylesheet.href.includes("light")) {
      themeStylesheet.href = "dark-theme.css";
    } else {
      themeStylesheet.href = "light-theme.css";
    }
    localStorage.setItem("theme", themeStylesheet.href);
  }

  Mousetrap.bind({
    "?": function modal() {
      $("#help").modal("show");
    },
    t: change,
  });

  const hr = document.querySelector("#hr");
  const mn = document.querySelector("#mn");
  const sc = document.querySelector("#sc");

  setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

    let hour = document.querySelector("#hour");
    let minutes = document.querySelector("#minutes");
    let seconds = document.querySelector("#seconds");
    let ampm = document.querySelector("#ampm");
    let good = document.querySelector("#good");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    var am = "AM";
    var morning = "Good Night";

    if (h > 1 && h < 11) {
      var morning = "Good Morning";
    } else if (h > 10 && h < 17) {
      var morning = "Good Afternoon";
    } else if (h > 16 && h < 23) {
      var morning = "Good Night";
    }

    if (h > 12) {
      h = h - 12;
      var am = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hour.innerHTML = h + ":";
    minutes.innerHTML = m + ":";
    seconds.innerHTML = s + "&nbsp";
    ampm.innerHTML = am;
    good.innerHTML = morning;
  });

  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10);
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 1000;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("typendelete");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  };
});
