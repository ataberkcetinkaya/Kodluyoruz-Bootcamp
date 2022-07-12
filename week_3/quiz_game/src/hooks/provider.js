import { useState, createContext, useEffect } from 'react';

export const Context = createContext();

const randomNmb = () => Math.floor(Math.random() * 8 + 2);

const getSqrt = (a, b) => Math.ceil(Math.sqrt(a * b));

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Provider = ({ children }) => {
    const [tour, setTour] = useState(0);
    const [questionsArr, setQuestionsArr] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [bgColor, setBgColor] = useState('#2d2d2d');
    const [isClick, setIsClick] = useState(false);
    const [clickBtnId, setClickBtnId] = useState(null);
    const [resultQuestions, setResultQuestions] = useState([]);
    const [trueAnswerCount, setTrueAnswerCount] = useState(0);
    const [totalResult, setTotalResult] = useState({ totalScore: 0, totalQuestions: 0, correctAnswers: 0 });

    const setAllQuestion = () => {
        const newArr = []; //create an empty array
        setCurrentNumber(0); //starting value of currentNumber is 0
        setResultQuestions([]); //the questions array is gonna be empty

        for (let i = 0; i < 10; i++) { //the for loop for creating 10 questions
            const numA = randomNmb();
            const numB = randomNmb();
            const scorePoint = getSqrt(numA, numB); //square root of numbers for scores
            const trueAnswer = numA * numB;
            const answerObj = { //the rule for the other random answers
                a1: numA * numB,
                a2: (numA + 1) * numB,
                a3: numA * (numB - 1)
            };
            let answerArr = Object.values(answerObj); //getting the answers values into an array
            answerArr = shuffleArray(answerArr); //shuffle the array

            newArr.push({ //all the values into the newArr
                numA,
                numB,
                scorePoint,
                trueAnswer,
                answerArr,
                result: null
            });
        }
        setCurrentQuestion(newArr[currentNumber]); //change the current question
        setQuestionsArr(newArr); //newArr to real QuestionsArr
    };

    const checkAnswer = (answer, btnId) => { //check the answer
        const isTrue = answer === currentQuestion.trueAnswer;
        const resultQuestionText = `${currentQuestion.numA} x ${currentQuestion.numB} = ${currentQuestion.trueAnswer}`;
        setIsClick(true);
        setClickBtnId(btnId);

        if (isTrue) { //if correct
            setResultQuestions([...resultQuestions, {
                resultQuestionText,
                isAnswerTrue: true
            }]);
            setTrueAnswerCount(trueAnswerCount + 1);
            setBgColor('green');
        } else {
            setResultQuestions([...resultQuestions, {
                resultQuestionText,
                isAnswerTrue: false
            }]);
            setBgColor('red');
        }

        setTimeout(() => {
            if (isTrue) {
                setScore(score + currentQuestion.scorePoint);
            }
            setBgColor('#2d2d2d');
            setCurrentNumber(currentNumber + 1);
            setClickBtnId(null);
            setIsClick(false);
        }, 3000);
    };

    const setTotalResultToStorage = (data) => { //updating the total values
        if (data) {
            setTotalResult(data);
        } else {
            setTotalResult(prevState => (
                {
                    ...prevState,
                    totalScore: prevState.totalScore + score,
                    totalQuestions: prevState.totalQuestions + questionsArr.length,
                    correctAnswers: prevState.correctAnswers + trueAnswerCount
                }));
        }
    };

    useEffect(() => { //to the next question
        if (questionsArr.length > 0) {
            setCurrentQuestion(questionsArr[currentNumber]);
        }
    }, [currentNumber]);

    useEffect(() => { //saving to the local storage
        localStorage.setItem('totalResult', JSON.stringify(totalResult));
    }, [totalResult]);

    useEffect(() => { //saving to the local storage
        localStorage.setItem('tour', JSON.stringify(tour));
    }, [tour]);

    return (
        <Context.Provider value={{
            tour,
            questionsArr,
            score,
            currentQuestion,
            isClick,
            currentNumber,
            bgColor,
            clickBtnId,
            resultQuestions,
            trueAnswerCount,
            totalResult,
            setTour,
            checkAnswer,
            setAllQuestion,
            setTotalResultToStorage
        }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;