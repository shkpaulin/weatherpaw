// script.js

const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDiv = document.getElementById('weather');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const iconElement = document.getElementById('icon'); // Nama variabel lebih spesifik

const API_KEY = "1a32fddb45c48bb50a508a2b235afd02";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Mohon masukkan nama kota!');
        return;
    }

    weatherDiv.classList.add('hidden');
    cityName.textContent = ''; 
    temperature.textContent = '';
    description.textContent = '';
    iconElement.innerHTML = ''; 

    try {
    
        const response = await fetch(`${API_URL}q=${city}&appid=${API_KEY}&units=metric`); 

        // Cek jika respon tidak OK (misal 404 Not Found, 401 Unauthorized)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mengambil data cuaca');
        }

        const data = await response.json(); // Mengubah respon menjadi JSON

        // Memperbarui elemen HTML dengan data cuaca
        cityName.textContent = data.name + ", " + data.sys.country;
        temperature.textContent = `Suhu: ${data.main.temp}°C`;
        description.textContent = `Kondisi: ${data.weather[0].description}`;

        // Untuk ikon cuaca
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const imgElement = document.createElement('img');
        imgElement.src = iconUrl;
        imgElement.alt = data.weather[0].description;
        iconElement.innerHTML = ''; // Pastikan bersih sebelum menambah gambar
        iconElement.appendChild(imgElement);

        weatherDiv.classList.remove('hidden'); // Tampilkan div cuaca
        
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        weatherDiv.innerHTML = `<p style="color: red;">Error: ${error.message}. Coba lagi atau periksa nama kota.</p>`;
        weatherDiv.classList.remove('hidden');
    }
});