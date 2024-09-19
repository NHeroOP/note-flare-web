import { databases } from "../config";

export default async function waitForAttributes(databaseId: string, collectionId: string, attributeKeys: Array<string>) {
  let attributesAvailable = false;
  
  while (!attributesAvailable) {
    const collection = await databases.getCollection(databaseId, collectionId);
    
    attributesAvailable = attributeKeys.every(key => {
      const attribute: any = collection.attributes.find((attr: any) => attr.key === key);
      return attribute && attribute.status === 'available';
    });

    if (!attributesAvailable) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}