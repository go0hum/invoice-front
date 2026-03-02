import { z } from "zod"

export const invoiceItemSchema = z.object({
    id: z.string().min(1, { message: "El ID es requerido" }),
    tipo: z.string().min(3, { message: "El tipo es requerido" }),
    descripcion: z.string().min(3, { message: "La descripción es requerida" }),
    cantidad: z.coerce.number().min(1, { message: "La cantidad debe ser al menos 1" }),
    precio: z.coerce.number().min(1, { message: "El precio debe ser al menos 1" }),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export const invoiceSchema = z.object({
    logo: z
        .any()
        .refine((files) => files?.length == 1, "La imagen es requerida.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `El tamaño máximo es de 10MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Solo se soportan formatos .jpg, .jpeg, .png y .gif."
        )
        .optional(),

    emisor: z.object({
        compania: z.string().min(3, { message: "La compañia es requerido" }),
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        apellido: z.string().min(1, { message: "El apellido es requerido" }),
        sitioweb: z.string().url({ message: "El sitio web debe ser una URL valida" }),
        telefono: z.string().min(1, { message: "El teléfono es requerido" }),
        email: z.string().email({ message: "Correo inválido" }).min(1, { message: "El correo es requerido" }),
        direccion: z.string().optional(),
        ciudad: z.string().optional(),
        estado: z.string().optional(),
        codigoPostal: z.string().optional(),
        pais: z.string().optional(),
    }),

    cliente: z.object({
        compania: z.string().optional(),
        nombre: z.string().min(3, { message: "El nombre es requerido" }),
        apellido: z.string().min(3, { message: "El apellido es requerido" }),
        email: z.string().email({ message: "Correo inválido" }).min(1, { message: "El correo es requerido" }),
        direccion: z.string().optional(),
        ciudad: z.string().optional(),
        estado: z.string().optional(),
        codigoPostal: z.string().optional(),
        pais: z.string().optional(),
    }),

    numeroFactura: z.string().min(1, { message: "El número de factura es requerido" }),
    fechaFactura: z.string().min(1, { message: "La fecha de factura es requerida" }),
    fechaVencimiento: z.string().min(1, { message: "La fecha de vencimiento de la factura es requerida" }),

    items: z.array(invoiceItemSchema)
        .min(1, { message: "Debes agregar al menos un concepto" })
        .refine(
            (items) => {
                if (items.length === 0) return true;
                return items.every((item) => item.tipo === items[0].tipo);
            },
            {
                message: "Todos los conceptos deben ser del mismo tipo (solo productos o solo servicios)",
                path: ["items"],
            }
        ),
    impuesto: z.coerce.number().min(0, { message: "Los impuestos deben ser al menos 0" }),
    descuento: z.coerce.number().min(0, { message: "El descuento debe ser al menos 0" }),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;