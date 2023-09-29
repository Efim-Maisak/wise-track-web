import React, {useState, useEffect} from "react";
import { Box, Flex, Heading, Select, Menu, MenuList, MenuButton, MenuItem, IconButton, useDisclosure, Alert } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import AddObjectModal from "../AddObjectModal/AddObjectModal";
import DeleteObjectModal from "../DeleteObjectModal/DeleteObjectModal";
import AddDeviceModal from "../AddDeviceModal/AddDeviceModal";
import Devices from "../Devices/Devices";
import supabaseService from "../../services/supabaseService";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Objects = () => {

    const [ objectToStorage, setObjectToStorage ] = useLocalStorage("", "selectedObject");
    const [ objectIdToStorage, setObjectIdToStorage ] = useLocalStorage("", "selectedObjectId");

    const [selectedObjectId, setSelectedObjectId] = useState(objectIdToStorage);
    const [selectedObject, setSelectedObject] = useState(objectToStorage);
    const [objects, setObjects] = useState([]);
    const [devices, setDevices] = useState([]);
    const [objectIsAdded, setObjectIsAdded] = useState(false);
    const [objectIsDeleted, setObjectIsDeteted] = useState(false);
    const [deviceIsAdded, setDeviceIsAdded] = useState(false);

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
    const { isOpen: isOpenAddDeviceModal, onOpen: onOpenAddDeviceModal, onClose: onCloseAddDeviceModal } = useDisclosure();

    const {getObjects, getDevices} = supabaseService();

    const fetchUserObjects = async () => {
        await getObjects("c8ab3e1f-9ee1-43fc-9db0-0cf77878e5f8") // временное решение
        .then( res => setObjects(res.objects));
    }

    const fetchUserDevices = async (objectId) => {
        const res = await getDevices(objectId);
        if (res.devices) {
            setDevices(res.devices);
        }
        if(res.error) {
            throw new Error(res.error.message);
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
            <Box as="section" mt="4" p="4" w="620px" boxShadow="base" borderRadius="8px">
                <Heading as="h3" size="md">Мои объекты</Heading>
                <Flex justifyContent="space-between" mt="4">
                    <Select maxW="480px"size="md" variant="flushed" onChange={onChangeSеlectValue}>
                        {objects && objects.map(
                            obj => ((<option
                                        key={obj.id}
                                        //value={obj.object_name === selectedObject ? "default" : null}
                                        selected={obj.object_name === selectedObject}
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
                        <MenuItem icon={<AddIcon />} onClick={onOpenAddModal}>
                        Добавить
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={onOpenDeleteModal}>
                        Удалить
                        </MenuItem>
                    </MenuList>
                    </Menu>
                </Flex>
                {!objects ? <Alert mt={4} status='info' fontSize='sm'>Перед началом использования приложения добавьте объект недвижимости</Alert> : null}
            </Box>
            <Box as="section" mt="4" p="4 0 4 4" w="620px" boxShadow="base" borderRadius="8px">
                <Devices onOpenAddDeviceModal={onOpenAddDeviceModal} devices={devices}/>
            </Box>
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

export default Objects;