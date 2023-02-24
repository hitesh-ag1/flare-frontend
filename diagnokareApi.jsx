import axios from "axios"

var instance = axios.create();
var backendURL = 'http://localhost:8000/';
// var orthancURL = 'https://demo-orthanc.diagnokare.com/';
// var backendURL = 'https://demo-backend.diagnokare.com/';

// instance.interceptors.response.use(response => {
//     return response;
//  }, error => {
//     return error;
//  });

export default {
    errorHandler(error){
        try {
            return [0, error.response.status, error.response.data.detail]
    } catch (error2) {
        return [0, '404', error.message]
    }
    },
    async postNN(code, className){
    try{
        var response = await instance.post(backendURL + "modelnn?code="+code+"&classname="+className)
        return [1, null, null]
    }
    catch(error){
        return this.errorHandler(error)
    }
    },
    async postModelParams(code){
        try {
            var response = await instance.post(backendURL + "modelParams?code="+code)
            // console.log("Response: ",response);
            return [1, null, null]
        } catch (error) {
            return this.errorHandler(error)
        }
        
    },
    async postFLParams(agg, lr, rounds, nclients){
        try {
            var res = await instance.post(backendURL + "flParams?aggEpochs="+agg+"&lr="+lr+"&numRounds="+rounds+"&minClients="+nclients)
            return [1, null, null]
        } catch (error) {
            return this.errorHandler(error);
        }
        
    },
    async login(username, password){
        var bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);
        return instance.post(backendURL + "token", bodyFormData);
        
    },
    async deleteResource(diagnokareId) {
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        return instance.delete(backendURL + "studies/" + diagnokareId, {headers});
    },
    async cancelFindStudies() {
        if (window.axioFindStudiesAbortController) {
            window.axioFindStudiesAbortController.abort();
            window.axioFindStudiesAbortController = null;
        }
    },
    async findStudies(filterQuery, page) {
        await this.cancelFindStudies();
        window.axioFindStudiesAbortController = new AbortController();
        // console.log(filterQuery);
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var studies = instance.post(backendURL + "studies/?page="+page+"&size=15", filterQuery, {headers:headers});
        // console.log(studies);
        return studies;
    },
    async changePassword(username, current_pass, new_pass){
        var data = {
            'username': username,
            'current_password': current_pass,
            'new_password': new_pass
        }
        var res = await instance.put(backendURL+"change_password/", data)
        if(res.status == 200){
            return true;
        }
        else{
            return false;
        }
    },
    async getDoctors(){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var doctors = instance.get(backendURL + "doctors/", {headers:headers});
        return doctors;
    },
    async assignDoctor(patient, doctor){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var output = instance.post(backendURL+'assign_doctor/?pid='+patient.toString()+'&user='+doctor, null, {headers: headers});
        return output;
    },
    async getDownloadReportURL(resourcediagnokareId) {
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = (await instance.get(backendURL + 'downloadReportURL/' + resourcediagnokareId, {headers}));
        return res.data;
    },
    // async getStudy(studyid){
        
    // },
    // async uploadFile(filecontent) {
    //     return axios.post(diagnokareApiUrl + "instances", filecontent);
    // },
    async getStatistics() {
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        return instance.get(backendURL + "statistics/", {headers});
    },
    async getDownloadZipUrl(resourcediagnokareId) {
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = (await instance.get(backendURL + 'downloadURL/' + resourcediagnokareId, {headers}));
        return res.data;
    },
    async updateHistory(history, pid){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var id = pid.toString();
        var res = await instance.patch(backendURL + 'addPatientHistory/'+id + '?history='+history, null, {headers:headers});
        if(res.data[0] == "Success"){
            return true
        }
        else{
            return false
        }
    },
    async getUploadReportURL(pid, file){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var id = pid.toString();
        var res = await instance.post(backendURL + 'uploadReportURL/?pid='+id, null, {headers:headers})
        if(res.status == 200){
            return this.uploadReport(id, res.data['url'], file)
        }
        else{
            return false;
        }
    },
    async uploadReport(pid, url, file){
        var res = await instance.put(url, file)
        if(res.status == 200){
            return this.uploadReportComplete(pid)
        }
        else{
            return false;
        }
    },
    async uploadReportComplete(pid){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.post(backendURL + 'reportUploaded/?pid='+pid+'&manual=true', null, {headers:headers})
        // console.log(res.status);
        if(res.status == 200){
            return true;
        }
        else{
            return false;
        }
    },
    async getPatientID(studyid){
        // console.log("Entering API");
        const headers = {Authorization: localStorage.getItem('token')}
        try{
            var res = await instance.get(orthancURL + 'dicom-web/studies/'+studyid+'/series', {headers:headers});
            // console.log("Series Status: ", res.status);
            if(res.status == 200){
                return(res.data[0]['00100020']['Value'][0]);
            }    
            else{
                alert("Error 1 occured. Please contact support.");
            }
        }
        catch(error){
            console.log("Error: "+error);
            var orthanc = await this.addtoOrthanc(studyid);
            if(orthanc == true){
                try{
                    var res = await instance.get(orthancURL + 'dicom-web/studies/'+studyid+'/series', {headers:headers});
                    if(res.status == 200){
                        return(res.data[0]['00100020']['Value'][0]);
                    }
                    else{
                        alert("Error 2 occured. Please contact support.")
                    }    
                }
                catch(error3){
                    console.log("Error 3: "+error3);
                    alert("Error 3 occured. Please contact support.");
                }
            // call dicom web again
            //return data
            }
            else{
                alert("Error 4 occured. Please contact support.");
            }
        }
    },
    async addtoOrthanc(id){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.get(backendURL + 'addStudyOrthanc/'+id+'/'+localStorage.getItem('token'), {headers:headers});
        if(res.status == 200){
            return true;
        }
        else{
            return false;
        }
    },
    async getStudyMetadata(id){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.get(backendURL + 'study/'+id, {headers:headers});

        // console.log(res.data);
        if(res.status == 200){
            return res.data;
        }
        else{
            return false;
        }
    },
    async saveReport(id, template, text){
        var req = {
            "study_id": id,
            "uploaded": false,
            "templateLabel": template,
            "text": text,
            "abnormalStatus": true
        };
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.post(backendURL + 'report', req, {headers:headers});

        if(res.status == 200){
            return true;
        }
        else{
            return false;
        }
        // console.log(id);
        // console.log(template);
        // console.log(fin);
        // console.log(opin);
        // console.log(adv);
    },
    async getReports(id){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.get(backendURL + 'report/'+id, {headers:headers});
        // console.log(res.data);
        if(res.status == 200){
            return res.data;
        }
        else{
            return false;
        }

    },

    async getTemplates(mod, desc){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var res = await instance.get(backendURL + 'templates/'+mod+'/'+desc, {headers:headers});
        // console.log(res.data);
        if(res.status == 200){
            return res.data;
        }
        else{
            return false;
        }
    },
    // async getTemplates(mod, desc){
    //     const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
    //     var res = await instance.get(backendURL + 'templates/'+mod+'/'+desc, {headers:headers});
    //     // console.log(res.data);
    //     if(res.status == 200){
    //         return res.data;
    //     }
    //     else{
    //         return false;
    //     }
    // },
    async emailStudy(from, to, resourcediagnokareId){
        const headers = { Authorization: "Bearer "+localStorage.getItem('token') };
        var id = resourcediagnokareId.toString();
        // var data = {to_id: email_ids, study_id:id};
        // console.log(data);
        var status;
        await instance.post(backendURL + 'email_study/?from_id='+from+'&to_id='+to+"&study_id="+id, null, {headers:headers})
        .then(function(res) {
            if(res.data==undefined){
                // alert("Email Sent Failed");
                status = false;
            }
            else{
                // alert("Email Sent Successfully");
                status = true;
            }
            // console.log("Response: ", res.status);
            // alert("Email Successfully Sent");
            // return true;
        })
        return status;
    },
}