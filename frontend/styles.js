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
  //for ios outside of safezone
  unsafearea:{
    flex:1,
    backgroundColor:'#F2E8CF',

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
  pickerContainer:{
      flexDirection: 'row', // Align children side by side
      alignItems: 'center', // Align children vertically in the center
      justifyContent: 'space-between', // Space out children evenly
      width: '90%', // Container takes full width of its parent
  },
  // Used for positioning elements absolutely within a relative container
  absoluteFill: {
    position: 'absolute',
    width: '98%',
    height: '100%',
  },
  // Card style for swipeable cards
  card: {
    flex:1,
    justifyContent:'space-between',
    width: '98%',
    height: Dimensions.get('window').height*0.65,
    backgroundColor: '#A7C957',
    borderRadius: 10,
    // padding:5,
    elevation: 5, // Common shadow/elevation style
    marginBottom:5
  },
  tradecard: {
    width: '100%',
    paddingTop:30,
    zIndex:3,
    height: Dimensions.get('window').height*0.888,
    backgroundColor: '#A7C957', 
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    display:"flex",
    paddingHorizontal:30,
    gap:15,
    alignItems:"center",

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
  filterList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 8,
    borderBottomWidth: 1,  // Add a border at the bottom
    borderColor: '#386641',  // Set the border color
  },
  cellStyle: {
    backgroundColor: '#386641',
    borderWidth: 1, // Thin border
    borderColor: '#ddd', // Border color
    padding: 8, // Adjust padding as needed
    textAlign: 'left', // Adjust text alignment as needed
  },

  cellStyle2: {
    backgroundColor: '#386641',
    borderRightWidth: 1, // Thin border
    borderColor: '#ddd', // Border color
    padding: 8, // Adjust padding as needed
    textAlign: 'left', // Adjust text alignment as needed
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

  toolbarIcon: {
    width: 60,
    height: 60,
  },

  //--------------------------- BUTTONS --------------------------------------

  // Button styling
  button: {
    backgroundColor: '#386641',
    padding: 10,
    marginVertical: 6,
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
    width: 100, 
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Add this line
 
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
  addRemoveButton: {
    padding: 10,
    width: '98%',
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center', 
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
    tradebutton:{
      width:120,
      height:40,
      fontSize:25,
      borderRadius:5,
      color: "#F2E8CF",
      justifyContent: 'center', 
      alignItems: 'center'
  },
  buyButton:{
    backgroundColor:'#386641'
  },
  sellButton:{
    backgroundColor:'#BC4749'

  },
  buttonText:{
    color:'#F2E8CF',
    textAlign:'center',
    flexDirection:'column',
    fontSize:25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap:15,
  },
        

  //--------------------------- INPUT FIELDS --------------------------------------
  // Input field style for forms
  inputField: {
    backgroundColor: '#F2E8CF',
    borderRadius: 5,
    width: '90%',
    height: 40,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#386641',
    fontFamily: 'Nunito',
  },
  picker:{
    
    
    backgroundColor:'#F2E8CF',
    borderRadius:10,
    // borderWidth: 0, // No border
    fontWeight: 'bold',
    fontSize: 20,
    color: '#386641',
    fontFamily: 'Nunito',
  }
  ,

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
  boldTextG: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#386641',
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
  filterText: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontFamily: 'Nunito',
    marginLeft: 5,
  },
  overlayText:{
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  AccountValueText:{
    color: '#FFFFFF',
    fontSize: 42,
    marginLeft: 5,
    fontFamily: 'Nunito-Bold',
  },

  //-----------------Confirmation Page-----
  enteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  confirmationModal: {
    margin: 20,
    backgroundColor: '#F2E8CF',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});
