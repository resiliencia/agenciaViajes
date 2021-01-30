import {Testimonial} from '../models/Testimoniales.js'


const guardarTestimonial = async (req, res) => {

    //validar datos ingresados en formulario

    console.log(req.body);
    const { nombre, correo, mensaje} = req.body

    const errores = []

   if (nombre.trim() ==='') {
       errores.push({mensaje: "el nombre está vacio"});
   }

   if (correo.trim() ==='') {
    errores.push({mensaje: "el correo está vacio"});
   }

   if (mensaje.trim() ==='') {
    errores.push({mensaje: "el mensaje está vacio"});
   }

   if (errores.length>0) {

    //consultar testimoniales existentes

    const testimoniales = await Testimonial.findAll();
       
    //mostrarla vista con errores
    //primer parámetro vista y segundo el parametro que envias

    res.render('testimoniales', {
      pagina:'testimoniales',
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales

    })
   }else{

       //almacenarlo en la base de datos
       
       try {
           await Testimonial.create({
               nombre,
               correo,
               mensaje
           });

           res.redirect('/testimoniales');

       } catch (error) {
           console.log(error);
       }

   }

}

export {
    guardarTestimonial
}