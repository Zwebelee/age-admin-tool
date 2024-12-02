import {AgeEditorToolTemplateCard} from "./AgeEditorToolTemplateCard.tsx";
import {useRootStore} from "../../../stores/root-store.ts";

export const AgeEditorToolTest = () => {
    const {portalLicenseStore} = useRootStore();


    return (
        portalLicenseStore.visibleItems.map((item, index) => {
                return (
                    <AgeEditorToolTemplateCard
                        key={index}
                        item={item}
                        isEditing={false}
                        isNew={false}
                        onCancel={() => {
                        }}
                        onSave={() => {
                        }}
                        store={portalLicenseStore}
                        fields={[
                            {name: 'name', label: 'Name', type: 'text', disabled: false},
                            {name: 'description', label: 'Description', type: 'text', disabled: false},
                            {name: 'level', label: 'Level', type: 'text', disabled: false},
                            {name: 'state', label: 'State', type: 'text', disabled: false},
                            {name: 'maxusers', label: 'Max Users', type: 'number', disabled: false},
                            {name: 'currentusers', label: 'Current Users', type: 'number', disabled: false},
                            {name: 'id', label: 'ID', type: 'text', disabled: false},
                            {name: 'guid', label: 'GUID', type: 'text', disabled: false},
                        ]}
                    />
                )
            }
        ))
}