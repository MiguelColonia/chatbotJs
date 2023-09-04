const Recipes = require("../models/recipesModel")

const addReceps = async (req,res) => { // El controlador

    const { rezeptart, zutaten, anleitung } = req.body

    const resultZutaten = zutaten.join('\n')
    const resultAnleitung = anleitung.join('\n')

    const data = await Recipes.create({  rezeptart, zutaten : resultZutaten, anleitung: resultAnleitung })

    res.status(200).json({ status : "success", data })
}

module.exports = { addReceps }  