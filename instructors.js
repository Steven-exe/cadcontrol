const fs = require('fs')
const data = require("./data.json")
const {age} = require("./utils")

exports.show = function(req, res){

    const {id} = req.params

    const foundinstruc = data.instructors.find(function(instructors){
        return instructors.id ==  id
    })

    if (!foundinstruc) return res.send("Instructor not Found!")

    let teste = new Intl.DateTimeFormat('pt-BR').format(foundinstruc.criado)
    const instructors = {
        ...foundinstruc,
        age: age(foundinstruc.birth),
        services: foundinstruc.services.split(","),
        created: teste,
    }

    return res.render("instructors/show", {instructors})
}
// create
exports.post = function(req, res) {
        const keys = Object.keys(req.body)
        console.log(req.body)

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