$(document).ready(function(){
  let username = "coalition";
  let password = "skills-test";
  

  let credentials = btoa(`${username}:${password}`);
  let url = "https://fedskillstest.coalitiontechnologies.workers.dev";
  let systolicpatient_Data = []
  let diastolicpatient_Data = []
  let timeData = [];
  $.ajax({
    url: url,
    type: 'GET', 
    dataType: 'json',
    headers: {
		'Authorization': `Basic ${credentials}`
	},
    success: function(data) {
      //Jessica-taylor info
      patientsData = data;
      let patientInfo = patientsData[3];
      let patientInfoDiagnosticHistory = patientInfo.diagnosis_history.at(0);
       $(".selected-patient-name").html(patientInfo.name);
       $(".selected-patient-image").html(patientInfo.profile_picture);
       $(".selected-patient-birth-date").html(patientInfo.date_of_birth);
       $(".selected-patient-gender").html(patientInfo.gender);
       $(".selected-patient-contact").html(patientInfo.phone_number);
       $(".selected-patient-emergency-contact").html(patientInfo.emergency_contact);
       $(".selected-patient-insurance-provider").html(patientInfo.insurance_type);
       $(".respiratory_rate").html(patientInfoDiagnosticHistory.respiratory_rate.value);
       $(".rr_status").html(patientInfoDiagnosticHistory.respiratory_rate.levels);
       $(".temperature").html(patientInfoDiagnosticHistory.temperature.value +"" +  "&degF");
       $(".temp-status").html(patientInfoDiagnosticHistory.temperature.levels);
       $(".heart-rate").html(patientInfoDiagnosticHistory.heart_rate.value);
       $(".heart-rate-status").html(patientInfoDiagnosticHistory.heart_rate.levels);

/*        ============lab results display========================== */

   patientInfo.lab_results.map((result)=>{
    let patientLabResults =  $('<div></div>').addClass('specimen-info');
       patientLabResults.html(
        `<span>${result}</span>
        <span>
       <img src="./assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="">
       </span>`
       )
    $(".lab-info").append(patientLabResults);
   });


   /*        ============diagnostic results display========================== */

   patientInfo.diagnostic_list.map((diagnosis)=>{
    let diagnosisInfo =$('<div></div>').addClass('diagnosis');
            diagnosisInfo.html(
              `  <div class="problem ">
                  <h2>${diagnosis.name}</h2>
                  </div>
                 <div class="disease_description">
                 <p>${diagnosis.description}</p>
                 </div>
                 <div class="disease_status">
                 <p>${diagnosis.status}</p>
                 </div>
        `
            );

            $(".diagnosis_container").append(diagnosisInfo);
   })

      


       /* ===================chartInfo============= */
         //Bloodpressure info(bp)

       let bpInfo = patientInfo.diagnosis_history;
      
       bpInfo.map((monthly)=>{
       let systolicValues = monthly.blood_pressure.systolic.value;
       let diastolicValues = monthly.blood_pressure.diastolic.value;
       let month = monthly.month;
       let year = monthly.year;
       systolicpatient_Data.push(systolicValues);
       diastolicpatient_Data.push(diastolicValues);

       timeData.push({
        month:month,
        year:year
       });

       })
       



//Display chart


const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeData.slice(0,6).reverse().map((time)=> { return time.month + "," + time.year}),
      datasets: [{
        label: 'Systolic Blood Pressure', 
        data: systolicpatient_Data.slice(0,6).reverse().map((pressure)=> pressure),
        borderColor: "#C26EB4",
        fill: false, 
        tension: 0.4 
      },

      {
        label: 'Diastolic Blood Pressure', 
        data: diastolicpatient_Data.slice(0,6).reverse().map((pressure)=> pressure), 
        borderColor: '#8C6FE6', 
        fill: false, 
        tension: 0.4 
      }
    
    
    ]
    },
    options: {
        responsive: true, 
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months' 
            }
          },
          y: {
            title: {
              display: true,
              text: 'Blood Pressure (mmHg)'
            }
          }
        }
  
    }
  });

    

       //left-sidebar -patients info

       let limitedData = data.slice(0, 12);

       limitedData.map((patient)=>{

        let patientProfileElement = $('<div></div>').addClass('patient-info');
        

        patientProfileElement.html(
            `<img src=${patient.profile_picture}>
            <span>
            <h2>${patient.name}</h2>
            <p>${patient.gender}, ${patient.age}</p>
            </span>
            `
          );

          $('.patients').append(patientProfileElement); 
        

       });


       
        


    },
    error: function( status, error) {
      console.error('Error fetching data:', status, error);
    }
  });








    
  
  });



