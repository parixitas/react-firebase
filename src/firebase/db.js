import { db } from './firebase';

export const getObjects = (entity) => db.ref(`Master/${entity}`).once('value');
export const getObject = (entity, id) => db.ref(`Master/${entity}/${id}`).once('value');
export const deleteObject = (entity, id) => db.ref(`Master/${entity}/${id}`).remove();

export const getUsername = (uid) => db.ref(`Users/${uid}`).once('value');
export const doCreateUser = (id, username, email, displayName = null, photoURL = null) => {
    console.log('Creating user ', id);
    const userData = {
        username,
        email,
    };
    if(displayName) {
        userData.displayName = displayName;
    }
    if(photoURL) {
        userData.photoURL = photoURL;
    }
    return db.ref(`Users/${id}`).set(userData);
}
export const doUpdateUser = (id, username, email, displayName = null, photoURL = null) => {
    console.log('Updating user ', id);
    const ref = db.ref("Users");
    const uniqueRef = ref.child(id);
    uniqueRef.update({
        username: username,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
    });
}




export const getMyObjects = (uid, entity) => db.ref(`My/${uid}/${entity}`).once('value');
export const getMyObject = (uid, entity, id) => db.ref(`My/${uid}/${entity}/${id}`).once('value');
export const deleteMyObject = (uid, entity, id) => db.ref(`My/${uid}/${entity}/${id}`).remove();

export const doCreateCollection = (
    title,
    website,
    description,
    version,
    startDate,
    tags,
    isHandmade,
    uid,
    ) => {
    console.log('Creating a new Collection');
    const data = {
        title,
        website,
        description,
        version,
        startDate,
        tags,
        isHandmade,
    };
    const ref = db.ref(`My/${uid}/Collections`);
    return ref.push().set(data);
}
export const doUpdateCollection = (
        uniqueId,

        title,
        website,
        description,
        version,
        startDate,
        tags,
        isHandmade,
        uid,
    ) => {
    console.log('Updating Collection ', uniqueId);
    const ref = db.ref(`My/${uid}/Collections`);
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        website,
        description,
        version,
        startDate,
        tags,
        isHandmade,
    });
}

export const doCreateDiceSet = (
    idSet,
    title,
    description,
    purchaseDate,
    purchasePrice,
    salePrice,
    tags,
    diceOwned,
    isMine,
    isIncomplete,
    isWantToSell,
    isWantToBuy,
    isUnicorn,
    isHandmade,
    isAltered,
    //--------------
    uid,
    ) => {
    console.log('Creating a new DiceSet');
    const data = {
        idSet,
        title,
        description,
        purchaseDate,
        purchasePrice,
        salePrice,
        tags,
        diceOwned,
        isMine,
        isIncomplete,
        isWantToSell,
        isWantToBuy,
        isUnicorn,
        isHandmade,
        isAltered,
        };
    const ref = db.ref(`My/${uid}/DiceSets`);
    return ref.push().set(data);
}
export const doUpdateDiceSet = (
        uniqueId,
        idSet,
        title,
        description,
        purchaseDate,
        purchasePrice,
        salePrice,
        tags,
        diceOwned,
        isMine,
        isIncomplete,
        isWantToSell,
        isWantToBuy,
        isUnicorn,
        isHandmade,
        isAltered,    
        //----------------
        uid,
    ) => {
    console.log('Updating DiceSet ', uniqueId);
    const ref = db.ref(`My/${uid}/DiceSets`);
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        idSet,
        title,
        description,
        purchaseDate,
        purchasePrice,
        salePrice,
        tags,
        diceOwned,
        isMine,
        isIncomplete,
        isWantToSell,
        isWantToBuy,
        isUnicorn,
        isHandmade,
        isAltered,    
    });
}

export const doCreateSingleDie = (
    idDie, 
    idDiceSet,
    quantity,
    dieType,
    isMine,
    isWantToSell,
    isWantToBuy,
    isUnicorn,
    isHandmade,
    isAltered,
    maxSize,
    weight,
    setIndex,     
    description,
    purchaseDate,
    purchasePrice,
    salePrice,
    tags,
    //--------------
    uid,
) => {
console.log('Creating a new single die');
const data = {
    idDie, 
    idDiceSet,
    quantity,
    dieType,
    isMine,
    isWantToSell,
    isWantToBuy,
    isUnicorn,
    isHandmade,
    isAltered,
    maxSize,
    weight,
    setIndex,     
    description,
    purchaseDate,
    purchasePrice,
    salePrice,
    tags,
};
const ref = db.ref(`My/${uid}/SingleDice`);
const newRecord = ref.push().set(data);
return newRecord;
}
export const doUpdateSingleDie = (
    uniqueId, 
    idDie, 
    idDiceSet,
    quantity,
    dieType,
    isMine,
    isWantToSell,
    isWantToBuy,
    isUnicorn,
    isHandmade,
    isAltered,
    maxSize,
    weight,
    setIndex,     
    description,
    purchaseDate,
    purchasePrice,
    salePrice,
    tags,
    //--------------
    uid,
    ) => {
console.log('Updating set ', uniqueId);
const ref = db.ref(`My/${uid}/SingleDice`);
const uniqueRef = ref.child(uniqueId);
return uniqueRef.update({
    idDie, 
    idDiceSet,
    quantity,
    dieType,
    isMine,
    isWantToSell,
    isWantToBuy,
    isUnicorn,
    isHandmade,
    isAltered,
    maxSize,
    weight,
    setIndex,     
    description,
    purchaseDate,
    purchasePrice,
    salePrice,
    tags,
});
}

export const doCreateManufacturer = (title, website, country, description, isActive) => {
    console.log('Creating a new manufacturer');
    const data = {
        title,
        website,
        country,
        description,
        isActive,
    };
    const ref = db.ref("Master/Manufacturers");
    const newRecord = ref.push().set(data);
    return newRecord;
}
export const doUpdateManufacturer = (uniqueId, title, website, country, description, isActive) => {
    console.log('Updating manufacturer ', uniqueId);
    const ref = db.ref("Master/Manufacturers");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title: title,
        website: website,
        country: country,
        description: description,
        isActive: isActive,
    });
}

export const doCreateRetailer = (title, email, website, description, isActive) => {
    console.log('Creating a new Retailer');
    const data = {
        title,
        email,
        website,
        description,
        isActive,
    };
    const ref = db.ref("Master/Retailers");
    const newRecord = ref.push().set(data);
    return newRecord;
}
export const doUpdateRetailer = (uniqueId, title, email, website, description, isActive) => {
    console.log('Updating Retailer ', uniqueId);
    const ref = db.ref("Master/Retailers");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title: title,
        email: email,
        website: website,
        description: description,
        isActive: isActive,
    });
}

export const doCreateCrate = (title, email, website, description, isActive) => {
    console.log('Creating a new Crate');
    const data = {
        title,
        email,
        website,
        description,
        isActive,
    };
    const ref = db.ref("Master/Crates");
    return ref.push().set(data);
}
export const doUpdateCrate = (uniqueId, title, email, website, description, isActive) => {
    console.log('Updating Crate ', uniqueId);
    const ref = db.ref("Master/Crates");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title: title,
        email: email,
        website: website,
        description: description,
        isActive: isActive,
    });
}

export const doCreateShape = (
        title,
        description,
        sides,
        type,
        geometry,
        patentURL,
    ) => {
    console.log('Creating a new Shape');
    const data = {
        title,
        description,
        sides,
        type,
        geometry,
        patentURL,
    };
    const ref = db.ref("Master/Shapes");
    return ref.push().set(data);
}
export const doUpdateShape = (
        uniqueId,
        title,
        description,
        sides,
        type,
        geometry,
        patentURL,
    ) => {
    console.log('Updating Shape ', uniqueId);
    const ref = db.ref("Master/Shapes");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        sides,
        type,
        geometry,
        patentURL,
    });
}

export const doCreateColorGroup = (
    title,
    pantoneCode,
    rgbCode,
    hexCode,
) => {
    console.log('Creating a new Color Group');
    const data = {
        title,
        pantoneCode,
        rgbCode,
        hexCode,
    };
    const ref = db.ref("Master/ColorGroups");
    return ref.push().set(data);

}
export const doUpdateColorGroup = (
    uniqueId,
    title,
    pantoneCode,
    rgbCode,
    hexCode,
) => {
    console.log('Updating Color Group ', uniqueId);
    const ref = db.ref("Master/ColorGroups");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        pantoneCode,
        rgbCode,
        hexCode,
    });
}

export const doCreateColor = (
    title,
    colorGroup,
    pantoneCode,
    rgbCode,
    hexCode,
) => {
    console.log('Creating a new Color');
    const data = {
        title,
        colorGroup,
        pantoneCode,
        rgbCode,
        hexCode,
    };
    const ref = db.ref("Master/Colors");
    return ref.push().set(data);
}
export const doUpdateColor = (
    uniqueId,
    title,
    colorGroup,
    pantoneCode,
    rgbCode,
    hexCode,
) => {
    console.log('Updating Color ', uniqueId);
    const ref = db.ref("Master/Colors");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        colorGroup,
        pantoneCode,
        rgbCode,
        hexCode,
    });
}


export const doCreateMaterialType = (
    title,
    description,
    creationStory,
    methodOfProduction,
    isActive,
) => {
    console.log('Creating a new Material Type');
    const data = {
        title,
        description,
        creationStory,
        methodOfProduction,
        isActive,
    };
    const ref = db.ref("Master/MaterialTypes");
    return ref.push().set(data);

}
export const doUpdateMaterialType = (
    uniqueId,
    title,
    description,
    creationStory,
    methodOfProduction,
    isActive,
) => {
    console.log('Updating Material Type ', uniqueId);
    const ref = db.ref("Master/MaterialTypes");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        creationStory,
        methodOfProduction,
        isActive,
    });
}

export const doCreateMaterial = (
    title,
    description,
    materialType,
) => {
    console.log('Creating a new Material');
    const data = {
        title,
        description,
        materialType,
    };
    const ref = db.ref("Master/Materials");
    return ref.push().set(data);

}
export const doUpdateMaterial = (
    uniqueId,
    title,
    description,
    materialType,
) => {
    console.log('Updating Material ', uniqueId);
    const ref = db.ref("Master/Materials");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        materialType,
    });
}


export const doCreateStyleType = (
    title,
    description,
    isActive,
) => {
    console.log('Creating a new Style Type');
    const data = {
        title,
        description,
        isActive,
    };
    const ref = db.ref("Master/StyleTypes");
    return ref.push().set(data);

}
export const doUpdateStyleType = (
    uniqueId,
    title,
    description,
    isActive,
) => {
    console.log('Updating Style Type ', uniqueId);
    const ref = db.ref("Master/StyleTypes");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        isActive,
    });
}

export const doCreateDieType = (
    title,
    description,
    isActive,
) => {
    console.log('Creating a new Die Type');
    const data = {
        title,
        description,
        isActive,
    };
    const ref = db.ref("Master/DieTypes");
    return ref.push().set(data);

}
export const doUpdateDieType = (
    uniqueId,
    title,
    description,
    isActive,
) => {
    console.log('Updating Die Type ', uniqueId);
    const ref = db.ref("Master/DieTypes");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        isActive,
    });
}

export const doCreateStyle = (
    title,
    description,
    styleType,
    originalManufacturer,
    colorCount,
    isActive,
) => {
    console.log('Creating a new Style');
    const data = {
        title,
        description,
        styleType,
        originalManufacturer,
        colorCount,
        isActive,
    };
    const ref = db.ref("Master/Styles");
    return ref.push().set(data);
}
export const doUpdateStyle = (
    uniqueId,
    title,
    description,
    styleType,
    originalManufacturer,
    colorCount,
    isActive,
) => {
    console.log('Updating Style ', uniqueId);
    const ref = db.ref("Master/Styles");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        styleType,
        originalManufacturer,
        colorCount,
        isActive,
    });
}

export const doCreateSetType = (
    title,
    description,
    diceSlots,
    isActive,
) => {
    console.log('Creating a new Set Type');
    const data = {
        title,
        description,
        diceSlots,
        isActive,
    };
    const ref = db.ref("Master/SetTypes");
    return ref.push().set(data);
}
export const doUpdateSetType = (
    uniqueId,
    title,
    description,
    diceSlots,
    isActive,
) => {
    console.log('Updating Set Type ', uniqueId);
    const ref = db.ref("Master/SetTypes");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        diceSlots,
        isActive,
    });
}

export const doCreateUnitOfMeasure = (
    title,
    description,
    isActive,
) => {
    console.log('Creating a new unit of measurement');
    const data = {
        title,
        description,
        isActive,
    };
    const ref = db.ref("Master/UnitOfMeasures");
    return ref.push().set(data);
}
export const doUpdateUnitOfMeasure = (
    uniqueId,
    title,
    description,
    isActive,
) => {
    console.log('Updating units of measurement ', uniqueId);
    const ref = db.ref("Master/UnitOfMeasures");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        isActive,
    });
}

export const doCreateProductLine = (
    title,
    manufacturer,       
    website,
    description,
    version,
    productionDate,
    ColorCount,
    primaryStyle,
    primaryMaterial,
    primaryColor,
    isOutOfPrint,
    isHandmade,
    ) => {
    console.log('Creating a new Product Line');
    const data = {
        title,
        manufacturer,       
        website,
        description,
        version,
        productionDate,
        ColorCount,
        primaryStyle,
        primaryMaterial,
        primaryColor,
        isOutOfPrint,
        isHandmade,
    };
    const ref = db.ref("Master/ProductLines");
    return ref.push().set(data);
}

export const doUpdateProductLine = (
    uniqueId,
    title,
    manufacturer,       
    website,
    description,
    version,
    productionDate,
    ColorCount,
    primaryStyle,
    primaryMaterial,
    primaryColor,
    isOutOfPrint,
    isHandmade,
    ) => {
    console.log('Updating Product Line ', uniqueId);
    const ref = db.ref("Master/ProductLines");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        manufacturer,       
        website,
        description,
        version,
        productionDate,
        ColorCount,
        primaryStyle,
        primaryMaterial,
        primaryColor,
        isOutOfPrint,
        isHandmade,
    });
}

export const doCreateSet = (
    title,
    manufacturerSKU,
    website,
    description,
    version,
    productionDate,
    dieCount,
    setType,
    setStyle,
    material,
    color1,
    color2,
    color3,
    color4,
    color5,
    pipType,
    pipColor,
    pipFont,
    maxSize,
    unitOfMeasure,
    isActive,        
    idProductLine,
    ) => {
    console.log('Creating a new set');
    const data = {
        title,
        manufacturerSKU,
        website,
        description,
        version,
        productionDate,
        dieCount,
        setType,
        setStyle,
        material,
        color1,
        color2,
        color3,
        color4,
        color5,
        pipType,
        pipColor,
        pipFont,
        maxSize,
        unitOfMeasure,
        isActive,        
        idProductLine,
    };
    const ref = db.ref("Master/Sets");
    const newRecord = ref.push().set(data);
    return newRecord;
}
export const doUpdateSet = (
        uniqueId, 
        title,
        manufacturerSKU,
        website,
        description,
        version,
        productionDate,
        dieCount,
        setType,
        setStyle,
        material,
        color1,
        color2,
        color3,
        color4,
        color5,
        pipType,
        pipColor,
        pipFont,
        maxSize,
        unitOfMeasure,
        isActive,        
        idProductLine,
    ) => {
    console.log('Updating set ', uniqueId);
    const ref = db.ref("Master/Sets");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        manufacturerSKU,
        website,
        description,
        version,
        productionDate,
        dieCount,
        setType,
        setStyle,
        material,
        color1,
        color2,
        color3,
        color4,
        color5,
        pipType,
        pipColor,
        pipFont,
        maxSize,
        unitOfMeasure,
        isActive,        
        idProductLine,
    });
}

export const doCreateDie = (
    title,
    description,
    version,
    faces,
    faceShape,
    faceType,
    faceLayout,
    dieType,
    maxSize,
    pipType,
    weight,
    shape,   
    setIndex,     
    idSet,
    ) => {
    console.log('Creating a new die');
    const data = {
        title,
        description,
        version,
        faces,
        faceShape,
        faceType,
        faceLayout,
        dieType,
        maxSize,
        pipType,
        weight,
        shape,   
        setIndex,     
        idSet,
    };
    const ref = db.ref("Master/Dice");
    const newRecord = ref.push().set(data);
    return newRecord;
}
export const doUpdateDie = (
        uniqueId, 
        title,
        description,
        version,
        faces,
        faceShape,
        faceType,
        faceLayout,
        dieType,
        maxSize,
        pipType,
        weight,
        shape,   
        setIndex,     
        idSet,
    ) => {
    console.log('Updating die ', uniqueId);
    const ref = db.ref("Master/Dice");
    const uniqueRef = ref.child(uniqueId);
    return uniqueRef.update({
        title,
        description,
        version,
        faces,
        faceShape,
        faceType,
        faceLayout,
        dieType,
        maxSize,
        pipType,
        weight,
        shape,   
        setIndex,     
        idSet,
    });
}

