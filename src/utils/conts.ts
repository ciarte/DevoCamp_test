/* function createEmailApplicants(name: string) {
    return `Estimado ${name},

Nos complace informarle que su inscripción al campamento de programación ha sido confirmada. ¡Gracias por unirse a nosotros en esta aventura de aprendizaje!

Nuestro campamento de programación está diseñado para ayudarlo a adquirir habilidades valiosas y relevantes en el mundo de la tecnología. Durante el campamento, aprenderá metodologías y técnicas avanzadas que utilizan las grandes empresas para desarrollar software de calidad. Además, trabajará en equipo con otros participantes, lo que lo ayudará a mejorar sus habilidades de colaboración y comunicación.

Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estamos aquí para ayudarlo en cualquier momento.

Una vez más, gracias por inscribirse en nuestro campamento de programación. Esperamos conocerlo y trabajar juntos para desarrollar sus habilidades de programación.

Atentamente,
Devocamp`

}

export default createEmailApplicants; */

import { Request } from 'express';

export default function createEmail(name: string, req: Request) {
    const endpoint = req.originalUrl;
    if (endpoint === '/postulaciones') return `Estimado ${name}, Mensaje para la ruta 1`;
    else if (endpoint === '/empresas/') return `Estimado ${name}, Mensaje para la ruta 2`;
    else throw new Error(`Endpoint '${endpoint}' no es válido`);
};

