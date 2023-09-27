import supabase from "../config/supabaseClient";

const supabaseService = () => {

    const getDevices = async () => {
        let { data: devices, error } = await supabase
        .from('devices')
        .select();

        return { devices, error };
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

    return {
        getDevices,
        getObjects,
        postObjects,
        deleteObject
    };
};

export default supabaseService;
