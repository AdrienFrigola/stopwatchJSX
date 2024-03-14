import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
    // State variables for the stopwatch
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    
    // Refs to hold the interval ID and start time
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    // Effect to handle starting and stopping the stopwatch
    useEffect(() => {
        if (isRunning) {
            // Start the interval when running
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            // Clear the interval when not running
            clearInterval(intervalIdRef.current);
        }

        // Cleanup function to clear the interval
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]); // Run effect when isRunning changes

    // Function to start the stopwatch
    function start() {
        setIsRunning(true);
        // Update the start time to current time minus elapsed time
        startTimeRef.current = Date.now() - elapsedTime;
    }

    // Function to stop the stopwatch
    function stop() {
        setIsRunning(false);
    }

    // Function to reset the stopwatch
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // Function to format the elapsed time
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        // Format the time components with leading zeros
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        // Return the formatted time as a string
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    // JSX for the stopwatch component
    return (
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;
