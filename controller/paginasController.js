import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js'

const paginaInicio = async(req, res) => {

    //consultar 3 viajes del modelo viajes

    const promiseDB=[];

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

    try {

    const resultado = await Promise.all(promiseDB);

    //req enviamos, res lo que express nos responde
    //send json
    res.render('inicio' , {
        pagina: "inicio",
        clase: 'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
    });

        
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (req, res) => {

    res.render('nosotros' , {
        pagina: "nosotros"
    });

}

const paginaViajes = async (req, res) => {

    //consultar a bd
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes' , {
        pagina: "Próximos viajes",
        viajes
    });

    

}

//muestra página detalle por slug
const paginaDetalleViaje = async (req, res) => {

    //viaje nombre desde rutas :/
    //console.log(req.params.slug);

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({where: { slug: slug }});

        res.render('viaje' , {
            pagina: "Información viaje",
            viaje
        });

    } catch (error) {
        console.log(error);
    }

}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales' , {
            pagina: "testimoniales",
            testimoniales
        });
        
    } catch (error) {
        
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros, 
    paginaViajes,
    paginaTestimoniales, 
    paginaDetalleViaje
}