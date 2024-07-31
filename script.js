document.addEventListener('DOMContentLoaded', () => {
    const findHospitalsButton = document.getElementById('find-hospitals');
    const hospitalForm = document.getElementById('hospital-form');
    const resultsDiv = document.getElementById('results');
  
    findHospitalsButton.addEventListener('click', async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`/find-hospitals?lat=${latitude}&lng=${longitude}`);
            const data = await response.json();
            resultsDiv.innerHTML = '<h3>Nearest Hospitals:</h3>';
            if (data.hospitals.length > 0) {
              data.hospitals.forEach(hospital => {
                resultsDiv.innerHTML += `<p><strong>${hospital.name}</strong> - ${hospital.phone}</p>`;
              });
            } else {
              resultsDiv.innerHTML += '<p>No hospitals found nearby.</p>';
            }
          } catch (error) {
            console.error('Error fetching hospitals:', error);
          }
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  
    hospitalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const formData = new FormData(hospitalForm);
          const name = formData.get('name');
          const phone = formData.get('phone');
  
          try {
            const response = await fetch('/update-hospital', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, phone, lat: latitude, lng: longitude })
            });
  
            const result = await response.json();
            if (response.ok) {
              alert('Hospital information updated successfully.');
              hospitalForm.reset();
            } else {
              alert(result.message);
            }
          } catch (error) {
            console.error('Error updating hospital:', error);
          }
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  });
  