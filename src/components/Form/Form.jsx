import React, { useRef, useState } from 'react';
import styles from './Form.module.css'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dataTowers = [
    {
        value: 'А',
        label: 'А'
    },
    {
        value: 'Б',
        label: 'Б'
    }
]

const optionsFloor = []
for (let i = 3; i < 28; i++) {
    optionsFloor.push({
        value: `${i} этаж`,
        label: `${i} этаж`
    })
}

const optionsRoom = []
for (let i = 1; i < 11; i++) {
    optionsRoom.push({
        value: `${i} переговорная`,
        label: `${i} переговорная`
    })
}

const Form = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedFloor, setSelectedFloor] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedTower, setSelectedTower] = useState(null)
    const [comment, setComment] = useState('')
    const selectRef = useRef();
    const selectTowerRef = useRef();
    const selectRoomRef = useRef();

    const setDefaultValue = () => {
        setStartDate(new Date())
        setSelectedFloor(null)
        setSelectedRoom(null)
        setSelectedTower(null)
        setComment('')
        selectRef.current.clearValue()
        selectTowerRef.current.clearValue()
        selectRoomRef.current.clearValue()
    }

    const isSubmitAvailable = Boolean(selectedFloor && selectedRoom && selectedTower && comment)

    // тут нужно более подробно уточнить в каком формате сервер принимает данные и отправить их
    const JSONData = {
        'selectedFloor': selectedFloor?.value,
        'selectedRoom': selectedRoom?.value,
        'selectedTower': selectedTower?.value,
        'comment': comment,
        'date': startDate
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDefaultValue()
        console.log(JSONData);
    }

    return (
        <form className={styles.form} onSubmit={(e) => { handleSubmit(e) }}>
            <Select
                placeholder={'Выберите этаж'}
                defaultValue={selectedFloor}
                onChange={setSelectedFloor}
                options={optionsFloor}
                ref={selectRef}
            />
            <Select
                placeholder={'Выберите комнату'}
                options={optionsRoom}
                defaultValue={selectedRoom}
                onChange={setSelectedRoom}
                ref={selectRoomRef}
            />
            <Select
                placeholder={'Выберите башню'}
                options={dataTowers}
                defaultValue={selectedTower}
                onChange={setSelectedTower}
                ref={selectTowerRef}
            />
            <div><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className={styles.datePicker} minDate={new Date()} /></div>
            <textarea className={styles.textarea} placeholder='Оставьте комментарий' value={comment} onChange={(e) => { setComment(e.target.value) }}></textarea>
            <div className={styles.buttons}>
                <button className={styles.button} type='button' onClick={setDefaultValue}>Очистить</button>
                {isSubmitAvailable
                    ? <button className={styles.button} type='submit'>Отправить</button>
                    : <button className={`${styles.button} ${styles.button_type_disabled}`} disabled={true}>Отправить</button>
                }
            </div>
        </form>
    );
};

export default Form;