import React, {useState, useEffect, useRef} from "react";
import {
    Box,
    Flex,
    Heading,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    IconButton,
    useDisclosure,
    Alert,
    AlertIcon,
    Spinner,
    Tooltip,
    Select
    } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import Devices from "../Devices/Devices";
import RecordReadings from "../RecordReadings/RecordReadings";
import AddObjectModal from "../AddObjectModal/AddObjectModal";
import DeleteObjectModal from "../DeleteObjectModal/DeleteObjectModal";
import AddDeviceModal from "../AddDeviceModal/AddDeviceModal";
import LastIndications from "../LastIndications/LastIndications";
import { sortDevicesByName } from "../../utils/sortDevicesByName";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../hooks/useAuth";
import supabaseService from "../../services/supabaseService";


const Objects = () => {

    const { user } = useAuth();
    const {getObjects, getDevices} = supabaseService();

    const [ objectToStorage, setObjectToStorage ] = useLocalStorage("", "selectedObject");
    const [ objectIdToStorage, setObjectIdToStorage ] = useLocalStorage("", "selectedObjectId");

    const [lastloginedUser, setLastLoginedUser] = useState(user.id);
    const [objectsLoading, setObjectsLoading] = useState(false);
    const [selectedObjectId, setSelectedObjectId] = useState(objectIdToStorage);
    const [selectedObject, setSelectedObject] = useState(objectToStorage);
    const [objects, setObjects] = useState(null);
    const [devices, setDevices] = useState(null);
    const [objectIsAdded, setObjectIsAdded] = useState(false);
    const [objectIsDeleted, setObjectIsDeteted] = useState(false);
    const [deviceIsAdded, setDeviceIsAdded] = useState(false);
    const [deviceIsDeleted, setDeviceIsDeleted] = useState(false);
    const [indicationsIsAdded, setIndicationsIsAdded] = useState(false);

    const prevObjectIsAdded = useRef(objectIsAdded);
    const prevObjectIsDeleted = useRef(objectIsDeleted);
    const prevDeviceIsAdded = useRef(deviceIsAdded);
    const prevDeviceIsDeleted = useRef(deviceIsDeleted);

    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
    const { isOpen: isOpenAddDeviceModal, onOpen: onOpenAddDeviceModal, onClose: onCloseAddDeviceModal } = useDisclosure();


    const fetchUserObjects = async () => {
        try {
            setObjectsLoading(true);
            await getObjects(user.id)
            .then( res => setObjects(res.objects));
            setObjectsLoading(false);
        } catch(e) {
            throw new Error(e.message);
        }
    }

    const fetchUserDevices = async (objectId) => {
        if(objectId) {
            try {
                const res = await getDevices(objectId);
                if (res.devices) {
                    setDevices(sortDevicesByName(res.devices));
                }
                if(res.error) {
                    throw new Error(res.error.message);
                }
            } catch(e) {
                throw new Error(e.message);
            }
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
        if(user.id !== lastloginedUser) {
            setSelectedObjectId(null);
            setSelectedObject(null);
            setObjects(null);
            setDevices(null);
        }
    }, [user]);

    useEffect(() => {
        if(!objects) {
            fetchUserObjects();
        }
    }, []);

    useEffect(() => {
        setSelectedObject(objectToStorage);
        fetchUserDevices(objectIdToStorage);
    }, [selectedObject]);

    useEffect(() => {
        // условие для предотвращения срабатывания эффекта при первом рендере
        if (prevObjectIsAdded.current !== objectIsAdded || prevObjectIsDeleted.current !== objectIsDeleted) {
            fetchUserObjects();
        }
        prevObjectIsAdded.current = objectIsAdded;
        prevObjectIsDeleted.current = objectIsDeleted;
    }, [objectIsAdded, objectIsDeleted]);

    useEffect(() => {
        if (prevDeviceIsAdded.current !== deviceIsAdded || prevDeviceIsDeleted.current !== deviceIsDeleted) {
            fetchUserDevices(selectedObjectId);
        }
        prevDeviceIsAdded.current = deviceIsAdded;
        prevDeviceIsDeleted.current = deviceIsDeleted;
    }, [deviceIsAdded, deviceIsDeleted]);

    return (
        <>
            {
            !objectsLoading
            ?
            <View
            selectedObject={selectedObject}
            onChangeSеlectValue={onChangeSеlectValue}
            onOpenAddModal={onOpenAddModal}
            onOpenDeleteModal={onOpenDeleteModal}
            onOpenAddDeviceModal={onOpenAddDeviceModal}
            deviceIsDeleted={deviceIsDeleted}
            setDeviceIsDeleted={setDeviceIsDeleted}
            indicationsIsAdded={indicationsIsAdded}
            setIndicationsIsAdded={setIndicationsIsAdded}
            selectedObjectId={selectedObjectId}
            objects={objects}
            devices={devices}
            />
            :
            <Spinner
            mt={16}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
            />
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
            selectedObject={selectedObject}
            />
        </>
    );
};

const View = ({ selectedObject,
                onChangeSеlectValue,
                onOpenAddModal,
                onOpenDeleteModal,
                onOpenAddDeviceModal,
                deviceIsDeleted,
                setDeviceIsDeleted,
                indicationsIsAdded,
                setIndicationsIsAdded,
                selectedObjectId,
                objects,
                devices}) => {
    return(
            <>
                {
                !objects || objects.length === 0
                ?
                <Alert
                w="620px"
                mt={4}
                status="info"
                fontSize='sm'
                borderRadius={8}
                >
                <AlertIcon />
                Перед началом использования приложения добавьте объект недвижимости
                </Alert>
                :
                null
                }
                <Box as="section" mt={8} p="4" w="620px" boxShadow="lg" borderRadius="8px" bg="white">
                    <Heading as="h3" size="md">Мои объекты</Heading>
                    <Flex justifyContent="space-between" mt="4">
                        <Tooltip bg="white" color="gray.600" label="Выбранный объект" openDelay="600">
                            <Select
                                maxW="480px"
                                size="md"
                                variant="filled"
                                focusBorderColor="teal.600"
                                isDisabled={objects && objects.length > 0 ? false : true}
                                value={selectedObject || ""}
                                onChange={onChangeSеlectValue}
                                >
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
                        </Tooltip>
                        <Menu placement="bottom-end">
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FaBars/>}
                            variant='outline'
                        />
                        <MenuList minW="0">
                            <MenuItem icon={<AddIcon fontSize="16px"/>} onClick={onOpenAddModal}>
                            Добавить
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon fontSize="16px" color="red.500"/>} onClick={onOpenDeleteModal}>
                            Удалить
                            </MenuItem>
                        </MenuList>
                        </Menu>
                    </Flex>
                </Box>
                <Devices
                onOpenAddDeviceModal={onOpenAddDeviceModal}
                deviceIsDeleted={deviceIsDeleted}
                setDeviceIsDeleted={setDeviceIsDeleted}
                devices={devices}
                objects={objects}
                />
                <LastIndications selectedObjectId={selectedObjectId} indicationsIsAdded={indicationsIsAdded}/>
                <RecordReadings devices={devices} indicationsIsAdded={indicationsIsAdded} setIndicationsIsAdded={setIndicationsIsAdded}/>
            </>
    )
}

export default Objects;