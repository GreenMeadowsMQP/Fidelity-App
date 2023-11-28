import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text ,Pressable} from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis,Tooltip } from 'react-native-responsive-linechart';
import axios from 'axios';
import moment from 'moment';

const myIP = '192.168.1.31'; //CHANGE IP TO RUN LOCALLY


function StockGraph(item) {
    const [selectedTimeframe, setSelectedTimeframe] = useState('Live'); // Default to 1M
    const [timeframeGraphData, setTimeframeGraphData] = useState([]);

    useEffect(() => {
        if (item.item && item.item.symbol) {
            fetchGraphData(item.item.symbol, selectedTimeframe);
        }
    }, [item.item, selectedTimeframe]);

    const fetchGraphData = async (symbol, timeframe) => {
        let startDate;
        const endDate = moment().format('YYYY-MM-DD'); // End date is always the current date

        switch (timeframe) {
            case 'Live':
                // For live data, you might want to fetch the most recent data or set a very short interval
                startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
                break;
            case '1W':
                startDate = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
                break;
            case '1M':
                startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
                break;
            case '3M':
                startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
                break;
            case '1Y':
                startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
                break;
            case '5Y':
                startDate = moment().subtract(5, 'years').format('YYYY-MM-DD');
                break;
            default:
                startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
        }

        try {
            const response = await axios.get('http://' + myIP + ':3000/getGraphData?symbols=' + symbol + '&startDate=' + startDate + '&endDate=' + endDate);
           
            // console.log("response: ", response);
            // console.log("response data: ", response.data);
            // console.log("response data content: ", response.data.content[0]);
            const newGraphData = response.data.content[0].records;

            console.log("Fetched data: ", newGraphData);
            setTimeframeGraphData(newGraphData);
            console.log("State update called");

        } catch (error) {
            console.error('Error fetching graph data:', error);
            // Handle the error, e.g., by setting an error message in the state and displaying it to the user
        }
    };

    const transformedData = timeframeGraphData.map((item, index) => {
        return {
            x: index,
            y: item.price,
        };

    });


    const TimeframeButtons = ({ selectedTimeframe, onSelectTimeframe }) => {
        const timeframes = ['Live', '1W', '1M', '3M', '1Y', '5Y'];

        return (
            <View style={styles.timeframeButtonsContainer}>
                {timeframes.map((timeframe) => {
                    const isSelected = selectedTimeframe === timeframe;
                    return (
                        <Pressable
                            key={timeframe}
                            style={[
                                styles.timeframeButton,
                                isSelected && styles.selectedTimeframeButton // Apply additional styles if selected
                            ]}
                            onPress={() => onSelectTimeframe(timeframe)}
                        >
                            <Text style={[
                                styles.timeframeButtonText,
                                isSelected && styles.selectedTimeframeButtonText // Bold text if selected
                            ]}>
                                {timeframe}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        );
    };

    const handleTimeframeChange = (timeframe) => {
        setSelectedTimeframe(timeframe);
        fetchGraphData(item.item.symbol, timeframe);
    };


    if (!transformedData || transformedData.length === 0) {
        // Handle the case where data is not available
        return <Text>Loading data...</Text>; // Or any other placeholder
    }

    return (
        <View>
            <Chart
                style={{ height: 200, width: '100%' }}
                data={transformedData}
                padding={{ left: 0, bottom: 0, right: 0, top: 20 }}
                xDomain={{ min: (Math.min(...transformedData.map(item => item.x))), max: (Math.max(...transformedData.map(item => item.x))) }}
                yDomain={{ min: (Math.min(...transformedData.map(item => item.y))), max: (Math.max(...transformedData.map(item => item.y))) }}
            >
                <VerticalAxis tickCount={10} theme={{ grid: { visible: false }, axis: { visible: false }, ticks: { visible: false }, labels: { visible: false } }} />
                <HorizontalAxis tickCount={transformedData.length} theme={{ axis: { visible: false }, ticks: { visible: false }, grid: { visible: false }, labels: { visible: false } }} />
                <Area theme={{ gradient: { from: { color: '#BC4749' }, to: { color: '#A7C957', opacity: 0.2 } } }} />
                <Line
                    tooltipComponent={<Tooltip />}

                    theme={{ stroke: { color: '#BC4749', width: 5 } }} />
            </Chart>
            <TimeframeButtons
                selectedTimeframe={selectedTimeframe}
                onSelectTimeframe={handleTimeframeChange} />
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
      width: '100%', 
      height:'70%',
      padding: 0, 
      marginBottom:5, 
      backgroundColor: '#A7C957', 
      borderRadius: 10, 
      boxShadowColor: '#000', 
      boxShadowOffset: { width: 0, height: 2 },
      boxShadowOpacity: 0.25,
      boxShadowRadius: 3.84,
      elevation: 5, 
    },
    symbol: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop:20,
      marginLeft:20, 
    },
    headline: {
      fontSize: 16,
      margin:20,
    },
    price:{
      marginTop:10,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center', 
      
    },
    button: {
      // Set the dimensions large enough to fit the background and overlay.
      width: 60, // Width of the button; you might not need to change this.
      height: 60, // Height must be large enough to accommodate the overlay.
      justifyContent: 'center',
      alignItems: 'center',
      margin: 30, // This adds space between the buttons.
      // If the overlay is still cut off, you might need to increase the height even more.
    },
    buttonBackground: {
      position: 'absolute',
      width: '100%', // Full width of the button.
      height: '100%', // Full height of the button.
      borderRadius: 30, // Half of the width to make it circular, adjust if needed.
    },
    buttonOverlay: {
      position: 'absolute',
      width: 80, // Width of the overlay in pixels.
      height: 80, // Height of the overlay in pixels.
      borderRadius: 32, // Half of the overlay size to make it circular.
      // Remove top and left percentages. Instead, center using the following technique:
      alignSelf: 'center',
      // Negative margins will effectively expand the touchable area and allow the overlay to be fully visible.
      marginVertical: -(64 - 60) / 2, // Adjust this value based on your overlay size.
    },
    timeframeButtonsContainer: {
      flexDirection: 'row', // Align buttons in a row
      justifyContent: 'space-around', // Evenly space the buttons
      paddingVertical: 10, // Add some vertical padding
    },
    timeframeButton: {
      padding: 10, // Padding for touchable area
      borderRadius: 15, // Rounded corners
    },
    selectedTimeframeButton: {
      backgroundColor: '#386641', // Background color for selected button
      // Add boxShadow or other styling for "smoothed rectangular shading" here
      boxShadowColor: '#000',
      boxShadowOffset: { width: 0, height: 2 },
      boxShadowOpacity: 0.2,
      boxShadowRadius: 3,
      elevation: 2,
    },
    timeframeButtonText: {
      fontWeight: 'normal', // Default weight
    },
    selectedTimeframeButtonText: {
      fontWeight: 'bold', // Bold text for selected button
    },
  });

export default StockGraph;