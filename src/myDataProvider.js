import dp from './dataProvider';



const myDataProvider = (apiUrl ,httpClient) => {
    const dataProvider = dp(apiUrl, httpClient); 

    return {...dataProvider,

    update: (resource, params) => {
        console.log(params);
        
            if (resource !== 'products' || !params.data.picture) {
                // fallback to the default implementation
                return dataProvider.update(resource, params);
            }
    
    },
    create: (resource, params) => {
        
        if (resource !== 'products' || !params.data.picture) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

       
        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `picture` sent property, with `src` and `title` attributes.
         */
    //    console.log(params.data); 
        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const rawfile = params.data.picture.rawFile;
    
        // const formerPictures = params.data.pictures.filter(
        //     p => !(p.rawFile instanceof File)
        // );

        return convertFileToBase64(rawfile)
            .then(picture64 => ({
                    src: picture64,
                    title: `${params.data.pictures.title}`,
                })
            )
            .then(transformedNewPicture =>
                {
                    
               return dataProvider.create(resource, {                   
                    data: {
                        ...params.data,
                        picture: {
                            ...transformedNewPicture,
                            // ...formerPictures,
                        },
                    },
                });
            }
            );
    }}
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default myDataProvider;