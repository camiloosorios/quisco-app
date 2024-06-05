import { z } from "zod";

export const orderSchema = z.object({
    name: z.string().trim().min(1, 'Tu nombre es obligatorio'),
    total: z.number().min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number().min(1, 'El precio debe ser mayor a 0'),
        quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
        subtotal: z.number().min(1, 'El subtotal debe ser mayor a 0')
    }))
});

export const searchSchema = z.object({
    search : z.string()
        .trim()
        .min(1, { message: 'La busqueda no puede ir vacia' })
});

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image : z.string().trim().min(1, { message: 'La Imagen es obligatoria'})
})