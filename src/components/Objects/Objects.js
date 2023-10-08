import React, {useState, useEffect} from "react";
import { Box, Flex, Heading, Select, Menu, MenuList, MenuButton, MenuItem, IconButton, useDisclosure, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import Devices from "../Devices/Devices";
import RecordReadings from "../RecordReadings/RecordReadings";
import AddObjectModal from "../AddObjectModal/AddObjectModal";
import DeleteObjectModal from "../DeleteObjectModal/DeleteObjectModal";
import AddDeviceModal from "../AddDeviceModal/AddDeviceModal";

import supabaseService from "../../services/supabaseService";
import { useLocalStorage } from "../../hooks/useLocalStorage";


const Objects = () => {

    const [ objectToStorage, setObjectToStorage ] = useLocalStorage("", "selectedObject");
    const [ objectIdToStorage, setObjectIdToStorage ] = useLocalStorage("", "selectedObjectId");

    const [selectedObjectId, setSelectedObjectId] = useState(objectIdToStorage);
    const [selectedObject, setSelectedObject] = useState(objectToStorage);
    const [objects, setObjects] = useState(null);
    const [devices, setDevices] = useState(null);
    const [objectIsAdded, setObjectIsAdded] = useState(false);
    const [objectIsDeleted, setObjectIsDeteted] = useState(false);
    const [deviceIsAdded, setDeviceIsAdded] = useState(false);

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
    const { isOpen: isOpenAddDeviceModal, onOpen: onOpenAddDeviceModal, onClose: onCloseAddDeviceModal } = useDisclosure();

    const {getObjects, getDevices} = supabaseService();

    const fetchUserObjects = async () => {
        try {
            await getObjects("c8ab3e1f-9ee1-43fc-9db0-0cf77878e5f8") // временное решение
            .then( res => setObjects(res.objects));
        } catch(e) {
            throw new Error(e.message);
        }
    }

    const fetchUserDevices = async (objectId) => {
        try {
            const res = await getDevices(objectId);
            if (res.devices) {
                setDevices(res.devices);
            }
            if(res.error) {
                throw new Error(res.error.message);
            }
        } catch(e) {
            throw new Error(e.message);
        }
    };

    const onChangeSеlectValue = (e) => {
        setSelectedObject(e.target.value);
        setObjectToStorage(e.target.value);
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const objId = optionElement.getAttribute("data-id");
        setSelectedObjectId(objId);
        setObjectIdToStorage(objId);
    };

    useEffect(() => {
        fetchUserDevices(objectIdToStorage);
        setSelectedObject(objectToStorage);
        fetchUserObjects();
    }, [selectedObject]);

    useEffect(() => {
        fetchUserObjects();
    }, [objectIsAdded, objectIsDeleted]);

    useEffect(() => {
        fetchUserDevices(selectedObjectId);
    }, [deviceIsAdded]);


    return (
        <>
            {
            objects && devices
            ?
            <View
            selectedObject={selectedObject}
            onChangeSеlectValue={onChangeSеlectValue}
            onOpenAddModal={onOpenAddModal}
            onOpenDeleteModal={onOpenDeleteModal}
            onOpenAddDeviceModal={onOpenAddDeviceModal}
            objects={objects}
            devices={devices}
            />
            :
            <Spinner mt={16} thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl"/>
            }
            <AddObjectModal
            objectIsAdded={objectIsAdded}
            setObjectIsAdded={setObjectIsAdded}
            isOpen={isOpenAddModal}
            onClose={onCloseAddModal}
            />
            <DeleteObjectModal
            objectIsDeleted={objectIsDeleted}
            setObjectIsDeteted={setObjectIsDeteted}
            objects={objects}
            isOpen={isOpenDeleteModal}
            onClose={onCloseDeleteModal}
            />
            <AddDeviceModal
            deviceIsAdded={deviceIsAdded}
            setDeviceIsAdded={setDeviceIsAdded}
            isOpen={isOpenAddDeviceModal}
            onClose={onCloseAddDeviceModal}
            selectedObjectId={selectedObjectId}
            />
        </>
    );
};

const View = ({selectedObject, onChangeSеlectValue, onOpenAddModal, onOpenDeleteModal, onOpenAddDeviceModal, objects, devices}) => {
    return(
        <>
            {
            objects.length === 0
            ?
            <Alert
            w="620px"
            mt={4}
            status="info"
            fontSize='sm'>
            <AlertIcon />
            Перед началом использования приложения добавьте объект недвижимости
            </Alert>
            :
            null
            }
            <Box as="section" mt="4" p="4" w="620px" boxShadow="base" borderRadius="8px">
                <Heading as="h3" size="md">Мои объекты</Heading>
                <Flex justifyContent="space-between" mt="4">
                    <Select maxW="480px"size="md" variant="flushed" value={selectedObject} onChange={onChangeSеlectValue}>
                        {objects && objects.map(
                            obj => ((<option
                                        key={obj.id}
                                        value={obj.object_name === selectedObject ? obj.object_name : null}
                                        data-id={obj.id}
                                        >
                                        {obj.object_name}
                                    </option>))
                            )}
                    </Select>
                    <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FaBars/>}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem icon={<AddIcon/>} onClick={onOpenAddModal}>
                        Добавить
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon/>} onClick={onOpenDeleteModal}>
                        Удалить
                        </MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
            </Box>
            <Box as="section" mt="4" p="4 0 4 4" w="620px" boxShadow="base" borderRadius="8px">
                <Devices onOpenAddDeviceModal={onOpenAddDeviceModal} devices={devices} objects={objects}/>
            </Box>
            <RecordReadings devices={devices}/>
        </>
    )
}

export default Objects;