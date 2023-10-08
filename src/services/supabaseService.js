import supabase from "../config/supabaseClient";

const supabaseService = () => {

    const getDevicesTypes = async () => {
        let { data: devices_types, error } = await supabase
        .from('devices_types')
        .select('*');

        return { devices_types, error };
    };

    const getObjects = async (userId) => {
        let { data: objects, error } = await supabase
        .from('objects')
        .select('id, object_name, users_id')
        .contains('users_id', [ userId ]);

        return { objects, error };
        };

    const postObjects = async (objectName, userId) => {
        let { error } = await supabase
        .from('objects')
        .insert({ object_name: objectName, users_id: [ userId ] });

        return { error };
    };

    const deleteObject = async (objectId) => {
        let { error } = await supabase
        .from('objects')
        .delete()
        .eq('id', objectId );

        return { error };
    };

    const getDevices = async (objectId) => {
        let { data: devices, error } = await supabase
        .from('devices')
        .select('id, device_name, object, device_type_id(id, type_name, type_code, units)')
        .eq('object', objectId );

        return { devices, error };
    };

    const postDevices = async (objectId, deviceTypeId, deviceName) => {
        let { error } = await supabase
        .from('devices')
        .insert([
            { device_type_id: deviceTypeId, device_name: deviceName, object: objectId },
         ])
        .select();

        return { error };
    };

    const postIndications = async (indicationsArr) => {
        let { error } = await supabase
        .from('indications')
        .insert(indicationsArr);

        return {error};
    };

    const getIndications = async (objectId) => {
        let { data: indications, error } = await supabase
        .from('indications')
        .select(`id, billing_period, value, monthly_change, device_id!inner(id, device_name, object, device_type_id(type_code, type_name, units))`)
        .eq('device_id.object', objectId);

        return {indications, error};
    };

    return {
        getDevicesTypes,
        getObjects,
        postObjects,
        deleteObject,
        getDevices,
        postDevices,
        postIndications,
        getIndications
    };
};

export default supabaseService;
