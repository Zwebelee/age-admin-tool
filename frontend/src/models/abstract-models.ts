//TODO: WIP

/**
@JsonObject()
export abstract class AbstractModel {


     //* WIP -> Add Custom JsonSerializer e.g. (from typescript-json-serializer)
     //* Add identical Fields that are present in all/many models



     //* Returns if it is a new record or if it is loaded from database

     @JsonProperty({name: "OBJECTID"})
      objectId: number;

    get isNewRecord(): boolean {
        return !this.objectId;
    }
}
*/