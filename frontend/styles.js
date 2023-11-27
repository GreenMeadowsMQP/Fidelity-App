import { StyleSheet,Dimensions } from 'react-native';

export default StyleSheet.create({
  //--------------------------- CONTAINERS --------------------------------------

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
  // Used for positioning elements absolutely within a relative container
  absoluteFill: {
    position: 'absolute',
    width: '98%',
    height: '100%',
  },
  // Card style for swipeable cards
  card: {
    // flex:1,
    justifyContent:'space-between',
    width: '98%',
    height: '80%',
    backgroundColor: '#A7C957',
    borderRadius: 10,
    // padding:5,
    elevation: 5, // Common shadow/elevation style
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
  // Top section style if needed for specific layout purposes
  topsection: {
    flexDirection: 'row',
  },
  // Toolbar style for navigation or action bars
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cellStyle: {
    border: '1px solid #ddd', // Thin border
    padding: '8px', // Adjust padding as needed
    textAlign: 'left', // Adjust text alignment as needed
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  cellStyle2: {
    borderRightWidth: '1px', // Thin border
    padding: '8px', // Adjust padding as needed
    textAlign: 'left', // Adjust text alignment as needed
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  accountInfo: {
    backgroundColor: '#386641',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  table: {
    backgroundColor: '#386641',
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: 8,
  },

  //--------------------------- IMAGES --------------------------------------


  // Logo style
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  
  // Common icon style for header
  icon: {
    width: 40,
    height: 40,
  },

  //--------------------------- BUTTONS --------------------------------------

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
  // Selected timeframe button style
  selectedTimeframeButton: {
    backgroundColor: '#386641',
  },
  // Buy sell button for WL
  buySellButton: {
          backgroundColor: '#386641',
          padding: 10,
          width: '98%',
          marginVertical: 8,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center', 
        },

  //--------------------------- INPUT FIELDS --------------------------------------
  // Input field style for forms
  inputField: {
    backgroundColor: '#F2E8CF',
    borderRadius: 5,
    width: 300,
    height: 40,
  },

  //--------------------------- TEXT --------------------------------------

  // App title text
  appTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: -15,
    fontFamily: 'Nunito-Bold',
  },
  // Text style for buttons and other bold text
  boldText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#F2E8CF',
    fontFamily: 'Nunito',
  },
  // Text style for timeframe buttons
  timeframeButtonText: {
    fontWeight: 'normal',
    fontFamily: 'Nunito',
  },
  // Style for selected timeframe button text
  selectedTimeframeButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },  
  // Text style for cards like headlines, prices, etc.
  cardText: {
    fontSize: 16,
    margin: 20,
    fontFamily: 'Nunito',
  },
  // Specific style for symbol text in stock cards
  symbolText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'Nunito-Bold',
  },
  // Specific style for symbol text in WL
  symbolTextWL: {
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Nunito-Bold',
  },
  // Small Text for information on WL
  infoTextWL:{
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Nunito',
  },
  // Specific style for price text in stock cards
  priceText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Nunito-Bold',
  },
  whiteButtonText:{
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Nunito-Bold',
  },
  holdingsText:{
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Nunito',
  }
  
});
