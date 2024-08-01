document.getElementById('ageForm').addEventListener('submit', function (event) {
    event.preventDefault();
    calculateAge();
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('ageForm').reset();
    document.getElementById('results').style.display = 'none';
    document.getElementById('profileImage').style.display = 'none';
    document.getElementById('animeCharacter').style.display = 'none';
});

document.getElementById('saveBtn').addEventListener('click', function () {
    const birthdate = document.getElementById('birthdate').value;
    const profilePic = document.getElementById('profilePic').files[0];
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(profilePic);
    }
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('name', document.getElementById('name').value);
});

document.getElementById('loadBtn').addEventListener('click', function () {
    const birthdate = localStorage.getItem('birthdate');
    const profilePic = localStorage.getItem('profilePic');
    const name = localStorage.getItem('name');
    if (birthdate) {
        document.getElementById('birthdate').value = birthdate;
    }
    if (profilePic) {
        document.getElementById('profileImage').src = profilePic;
        document.getElementById('profileImage').style.display = 'block';
    }
    if (name) {
        document.getElementById('name').value = name;
    }
});

document.getElementById('themeSwitcher').addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
});

document.getElementById('musicToggle').addEventListener('click', function () {
    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

function calculateAge() {
    document.getElementById('loadingSpinner').style.display = 'block';
    setTimeout(() => {
        const birthdate = document.getElementById('birthdate').value;
        const name = document.getElementById('name').value;
        const profilePic = document.getElementById('profilePic').files[0];
        if (profilePic) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('profileImage').src = e.target.result;
                document.getElementById('profileImage').style.display = 'block';
            };
            reader.readAsDataURL(profilePic);
        }

        const birthDateObj = new Date(birthdate);
        if (isNaN(birthDateObj)) {
            alert('Please enter a valid date.');
            document.getElementById('loadingSpinner').style.display = 'none';
            return;
        }

        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        const dayDiff = today.getDate() - birthDateObj.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        const ageInDays = Math.floor((today - birthDateObj) / (1000 * 60 * 60 * 24));
        const zodiacSign = getZodiacSign(birthDateObj.getDate(), birthDateObj.getMonth() + 1);
        const chineseZodiac = getChineseZodiac(birthDateObj.getFullYear());
        const leapYear = isLeapYear(birthDateObj.getFullYear());
        const daysUntilBirthday = getDaysUntilBirthday(birthDateObj);
        const historicalEvent = getHistoricalEvent(birthDateObj.getFullYear());
        const funnyMessage = getFunnyMessage();
        const healthTips = getHealthTips(age);
        const motivationalQuote = getMotivationalQuote();
        const ageOnPlanets = getAgeOnPlanets(ageInDays);
        const ageInDogYears = getAgeInDogYears(age);
        const timeLived = getTimeLived(ageInDays);
        const upcomingBirthdays = getUpcomingBirthdays(birthDateObj);
        const horoscope = getHoroscope(zodiacSign);

        document.getElementById('greeting').innerText = `Hello, ${name}!`;
        document.getElementById('result').innerHTML = `
            You are ${age} years old.<br>
            Zodiac Sign: ${zodiacSign}<br>
            Chinese Zodiac: ${chineseZodiac}<br>
            Leap Year Birth: ${leapYear ? 'Yes' : 'No'}<br>
            Days Until Next Birthday: ${daysUntilBirthday}<br>
            Historical Event in Birth Year: ${historicalEvent}<br>
            Funny Message: ${funnyMessage}<br>
            Health Tips: ${healthTips}<br>
            Motivational Quote: ${motivationalQuote}<br>
            Age on Planets:<br>${ageOnPlanets}
            Age in Dog Years: ${ageInDogYears}<br>
            Time Lived: ${timeLived}<br>
            Upcoming Birthdays:<br>${upcomingBirthdays}<br>
            Horoscope: ${horoscope}
        `;

        const animeImages = [
            '4.jpeg',
            '5.png',
            '6.png'
        ];
        const randomAnimeImage = animeImages[Math.floor(Math.random() * animeImages.length)];
        document.getElementById('animeCharacter').style.backgroundImage = `url(${randomAnimeImage})`;
        document.getElementById('animeCharacter').style.display = 'block';

        document.getElementById('results').style.display = 'block';
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 2000);
}

function getZodiacSign(day, month) {
    const zodiacSigns = [
        { sign: "Capricorn", start: "01-01", end: "01-19" },
        { sign: "Aquarius", start: "01-20", end: "02-18" },
        { sign: "Pisces", start: "02-19", end: "03-20" },
        { sign: "Aries", start: "03-21", end: "04-19" },
        { sign: "Taurus", start: "04-20", end: "05-20" },
        { sign: "Gemini", start: "05-21", end: "06-20" },
        { sign: "Cancer", start: "06-21", end: "07-22" },
        { sign: "Leo", start: "07-23", end: "08-22" },
        { sign: "Virgo", start: "08-23", end: "09-22" },
        { sign: "Libra", start: "09-23", end: "10-22" },
        { sign: "Scorpio", start: "10-23", end: "11-21" },
        { sign: "Sagittarius", start: "11-22", end: "12-21" },
        { sign: "Capricorn", start: "12-22", end: "12-31" }
    ];

    const date = month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

    for (const zodiac of zodiacSigns) {
        if (date >= zodiac.start && date <= zodiac.end) {
            return zodiac.sign;
        }
    }
    return 'Unknown';
}

function getChineseZodiac(year) {
    const chineseZodiac = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return chineseZodiac[year % 12];
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysUntilBirthday(birthDate) {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    return Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));
}

function getHistoricalEvent(year) {
    const events = {
        2000: 'The Y2K bug did not cause widespread chaos.',
        2001: 'Wikipedia was launched.',
        2004: 'Facebook was founded.',
        2007: 'The first iPhone was released.',
        2010: 'Instagram was launched.'
    };
    return events[year] || 'A significant event happened this year.';
}

function getFunnyMessage() {
    const messages = [
        "You're not old, you're a classic!",
        "Aged like fine wine.",
        "You're not getting older, you're getting better.",
        "Age is merely the number of years the world has been enjoying you."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function getHealthTips(age) {
    if (age < 18) {
        return "Stay active and eat a balanced diet to support your growth.";
    } else if (age < 30) {
        return "Focus on maintaining a healthy lifestyle and regular exercise.";
    } else if (age < 50) {
        return "Stay active, eat healthily, and monitor your health regularly.";
    } else {
        return "Stay socially active, exercise regularly, and eat a balanced diet.";
    }
}

function getMotivationalQuote() {
    const quotes = [
        "The best way to predict your future is to create it.",
        "Age is an issue of mind over matter. If you don't mind, it doesn't matter.",
        "You are never too old to set another goal or to dream a new dream.",
        "The only limit to our realization of tomorrow is our doubts of today."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getAgeOnPlanets(ageInDays) {
    const daysInYear = 365.25;
    const planetYearLengths = {
        Mercury: 88,
        Venus: 225,
        Earth: daysInYear,
        Mars: 687,
        Jupiter: 4333,
        Saturn: 10759,
        Uranus: 30687,
        Neptune: 60190
    };

    let ageOnPlanets = '';
    for (const planet in planetYearLengths) {
        const ageOnPlanet = (ageInDays / planetYearLengths[planet]).toFixed(2);
        ageOnPlanets += `${planet}: ${ageOnPlanet} years<br>`;
    }
    return ageOnPlanets;
}

function getAgeInDogYears(age) {
    return age * 7;
}

function getTimeLived(ageInDays) {
    const totalMinutes = ageInDays * 24 * 60;
    const totalSeconds = totalMinutes * 60;
    return `${totalMinutes.toLocaleString()} minutes (${totalSeconds.toLocaleString()} seconds)`;
}

function getUpcomingBirthdays(birthDate) {
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    const birthdays = [];
    for (let i = 0; i < 5; i++) {
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1 + i);
        } else {
            nextBirthday.setFullYear(today.getFullYear() + i);
        }
        birthdays.push(`${nextBirthday.toDateString()} (${nextBirthday.toLocaleString('en-US', { weekday: 'long' })})`);
    }
    return birthdays.join('<br>');
}

function getHoroscope(zodiacSign) {
    const horoscopes = {
        Aries: "Today is a good day to focus on your goals.",
        Taurus: "Take time to relax and enjoy the simple pleasures.",
        Gemini: "Communication is key today. Share your thoughts.",
        Cancer: "Emotions may run high. Stay balanced.",
        Leo: "Show your leadership skills. Be confident.",
        Virgo: "Pay attention to details. They matter.",
        Libra: "Seek harmony in your relationships.",
        Scorpio: "Intense energy can lead to great transformations.",
        Sagittarius: "Adventure awaits. Be open to new experiences.",
        Capricorn: "Hard work will bring rewards. Stay disciplined.",
        Aquarius: "Innovative ideas can lead to success.",
        Pisces: "Trust your intuition. It's strong today."
    };
    return horoscopes[zodiacSign] || "Have a wonderful day!";
}
