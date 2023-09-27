import React, {useState, useEffect} from "react";
import { Box, Flex, Heading, Select, Menu, MenuList, MenuButton, MenuItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import AddObjectModal from "../AddObjectModal/AddObjectModal";
import DeleteObjectModal from "../DeleteObjectModal/DeleteObjectModal";
import supabaseService from "../../services/supabaseService";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Objects = () => {

    const [objects, setObjects] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
    const [ objectToStorage, setObjectToStorage ] = useLocalStorage("", "selectedObject");

    const {getObjects} = supabaseService();

    const fetchUserObjects = () => {
        getObjects("c8ab3e1f-9ee1-43fc-9db0-0cf77878e5f8") // временное решение
        .then( res => setObjects(res.objects));
    }

    useEffect(() => {
        fetchUserObjects();
        setSelectedObject(objectToStorage);
    }, [objects]);

    const onChangeSеlectValue = (e) => {
        setSelectedObject(e.target.value);
        setObjectToStorage(e.target.value);
    };

    return (
        <>
        <Box as="section" mt="4" p="4" w="620px" boxShadow="base" borderRadius="8px">
            <Heading as="h3" size="md">Мои объекты</Heading>
            <Flex justifyContent="space-between" mt="4">
                <Select maxW="480px"size="md" variant="flushed" onChange={onChangeSеlectValue}>
                    {objects.map(
                         obj => ((<option
                                    key={obj.id}
                                    value={obj.object_name}
                                    selected={obj.object_name === objectToStorage}
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
        </Box>
        <AddObjectModal isOpen={isOpenAddModal} onClose={onCloseAddModal}/>
        <DeleteObjectModal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal}/>
        </>
    );
};

export default Objects;