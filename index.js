import express from 'express';
import axios from 'axios';

const app=express();
const port= 3000;

app.use(express.static('public'));

app.get('/', async (req,res)=>{
    try {
        const potionResponse = await axios.get('https://api.potterdb.com/v1/potions?filter[name_not_null]=true&filter[effect_not_null]=true&filter[ingredients_not_null]=true&filter[image_not_null]=true');
        const potions=potionResponse.data.data;
        const  randomPotion=potions[Math.floor(Math.random() * potions.length)];
        const name=randomPotion.attributes.name;
        const effect=randomPotion.attributes.effect;
        const ingredients=randomPotion.attributes.ingredients;
        

        const spellResponse= await axios.get(
            'https://api.potterdb.com/v1/spells?filter[name_not_null]=true&filter[effect_not_null]=true&filter[incantation_not_null]=true'
          );
        const spells=spellResponse.data.data;
        const randomSpell=spells[Math.floor(Math.random() * spells.length)];
        const spellName=randomSpell.attributes.name;
        const spellEffect=randomSpell.attributes.effect;
        const incantation=randomSpell.attributes.incantation;
        res.render("index.ejs", { 
            name,
            effect, 
            ingredients,
            spellName,
            spellEffect,
            incantation
        });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }
    
})

app.get('/books', async (req, res) => {
        try {
            const response = await axios.get('https://api.potterdb.com/v1/books?filter[title_not_null]=true&filter[pages_not_null]=true');
            const books= response.data.data;
            const bookDetails=[];
            
            for(let i=0;i<books.length;i++){
                const cover=books[i].attributes.cover;
                bookDetails.push({
                    cover
                })
            }
            res.render('books.ejs',{
                books:bookDetails
            }); 
          } catch (error) {
            res.render("index.ejs", { content: JSON.stringify(error.response.data) });
          }
   
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

