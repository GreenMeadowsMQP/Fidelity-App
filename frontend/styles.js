import { StyleSheet,Dimensions } from 'react-native';

export default StyleSheet.create({
  // General container used throughout the app
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E8CF',
  },
   // Unique right container style
   rightcontainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-end",
    flex: 1,
    marginRight: 15,
    gap: 15,
  },
    // Unique left container style
    leftcontainer: {
        flexDirection: "row",
        alignItems: 'center',
      },
  // Common header style
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    height: 50,
    width: '100%',
  },
  // Logo style
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  // App title text
  appTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: -15,
  },
  // Common icon style for header
  icon: {
    width: 40,
    height: 40,
  },
  // Used for positioning elements absolutely within a relative container
  absoluteFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // Card style for swipeable cards
  card: {
    // flex:1,
    justifyContent:'space-between',
    width: '100%',
    height: '70%',
    backgroundColor: '#A7C957',
    borderRadius: 10,
    elevation: 5, // Common shadow/elevation style
  },
  // Text style for buttons and other bold text
  boldText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#F2E8CF',
    fontFamily: 'Nunito',
  },
  // Button styling
  button: {
    backgroundColor: '#386641',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Container for buttons when placed together
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // Individual button style
  individualButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  // Background style for buttons that require an image or color fill
  buttonBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  // Style for button overlays if needed
  buttonOverlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 32,
    alignSelf: 'center',
  },
  // Timeframe buttons container for stock chart time filters
  timeframeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  // Unselected timeframe button style
  timeframeButton: {
    padding: 10,
    borderRadius: 15,
  },
  //ticker List for watchlist
  tickerList: {
    width: '98%', 
    height: Dimensions.get('window').height * 0.65,
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
  // Selected timeframe button style
  selectedTimeframeButton: {
    backgroundColor: '#386641',
  },
  // Text style for timeframe buttons
  timeframeButtonText: {
    fontWeight: 'normal',
  },
  // Style for selected timeframe button text
  selectedTimeframeButtonText: {
    fontWeight: 'bold',
  },
  // Top section style if needed for specific layout purposes
  topsection: {
    flexDirection: 'row',
  },
  // Input field style for forms
  inputField: {
    backgroundColor: '#F2E8CF',
    borderRadius: 5,
    width: 300,
    height: 40,
  },
  // Text style for cards like headlines, prices, etc.
  cardText: {
    fontSize: 16,
    margin: 20,
  },
  // Specific style for symbol text in stock cards
  symbolText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    marginLeft: 20,
  },
  // Specific style for price text in stock cards
  priceText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Toolbar style for navigation or action bars
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});