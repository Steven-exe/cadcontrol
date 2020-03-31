const fs = require('fs')
const data = require("./data.json")

exports.show = function(req, res){

    const {id} = req.params

    const foundinstruc = data.instructors.find(function(instructors){
        return instructors.id ==  id
    })

    if (!foundinstruc) return res.send("Instructor not Found!")

    const instruc = {
        ...foundinstruc,
        age: "",
        services: foundinstruc.services.split(","),
        created_at: "",
    }

    res.render("instructors/show", {instructors: instruc})
}
// create
exports.post = function(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Please, fill all the fields")
            }
        }
        
        let {avatar_url, name, birth, gender, services} = req.body
        
        birth= Date.parse(birth);
        const criado= Date.now();
        const id = Number(data.instructors.length + 1)


        
        data.instructors.push({
            id,
            avatar_url,
            name,
            birth,
            gender,
            services, 
            criado
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write file error!")

            return res.redirect("/instructors/create")
        })
    
        //return res.send(req.body)
    }