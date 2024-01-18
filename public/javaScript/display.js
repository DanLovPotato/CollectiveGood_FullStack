function display_Object(obj, tag) {
    try {
      let objOutput = "";
      for (let key in obj) {
        let temp = "<li><b>" + key + "</b>: " + obj[key] + "</li>";
        objOutput += temp;
      }
  
      if (objOutput === "") {
        output = output.replace(tag, "<li>None</li>");
      } else {
        output = output.replace(tag, objOutput);
      }
    } catch {
      output = output.replace(tag, "<li>None</li>");
    }
  }
  
  function display_Array(array, tag) {
    try {
      let arrayOutput = "";
      for (var i = 0; i < array.length; i++) {
        arrayOutput += "<li>" + array[i] + "</li>";
      }
      output = output.replace(tag, arrayOutput);
    } catch {
      output = output.replace(tag, "<li>None</li>");
    }
  }

// replace the palceholder in html with real data from Mongodb
exports.replaceTemplate = function (temp, caseEntity){
    globalThis.output = temp.replace(/{%Case%}/g, caseEntity._id); // /g means the global variable
    // replace Patient Demographics
    let patientDemo = "";
    for (let key in caseEntity.patient_demo) {
      let temp =
        "<li><b>" + key + "</b>: " + caseEntity.patient_demo[key] + "</li>";
      patientDemo += temp;
    }
    if (caseEntity.hasOwnProperty("pregnancy")) {
      patientDemo += "<li><b>pregnancy</b>: " + caseEntity.pregnancy + "</li>";
    }
    output = output.replace("{%Demographics%}", patientDemo);
    //replace Social History   
    display_Object(caseEntity.social_hist, "{%SocialHistory%}");
    // replace Current Symptoms
    display_Array(caseEntity.problem_list.symptoms, "{%CurrentSymptoms%}");
    //replace Chief Complaint
    display_Object(caseEntity.problem_list.chiefcomplaint, "{%ChiefComplaint%}");
    //replace Past Medical History
    display_Array(caseEntity.past_hist, "{%MedHistory%}");
    display_Array(caseEntity.preg_hist,"{%preg_hist%}");
    output = output.replace("{%preg_hist%}", "");
    //replace Current Medications
    display_Array(caseEntity.rx_list, "{%CurrentMedications%}");
    // replace Physical Examination
    display_Array(caseEntity.phys_ex, "{%PhyExam%}");
    display_Object(caseEntity.vitals, "{%Vital%}");
    //replace labs_dx
    display_Array(caseEntity.labs_dx, "{%LabDiag%}");
    //replace Family History
    let famHis = "";
    if (caseEntity.hasOwnProperty("fam_hist")) {
      famHis = caseEntity.fam_hist;
    }else{
      famHis = "<li>None</li>"
    }
    output = output.replace("{%FamilyHistory%}", famHis);
    return output;
  };
  
