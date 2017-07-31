
#1. Introduction

The contrail BGP implementation was designed from scratch to run on modern server environments. The main goals were to be able to take advantage of multicore CPUs, large (>4G) memory footprints and modern software development techniques.

BGP can be divided in the following components:

1. **Input processing**: decoding and validating messages received from each peer.
2. **Routing table operations**: modifying the routing table and determining the set of updates to generate.
3. **Update encoding**: draining the update queue and encoding messages to a set of peers.
4. **Management operations**: configuration processing and diagnostics.

This blueprint provides a detailed description on defining a new origin field by:

1. Making changes in Contrail configuration files. 
2. Making changes in Contrail GUI.
3. Making changes in controller.

All of these steps are to be performed for the new functionality to work successfully.


#2. Problem statement

### Modify the value of route origin when a route controller generates a route


#3. Proposed solution
Contrail by default exposes certain configurable options to the admin in management console which are eventually used by underlying service when making certain decisions or creating packets. In order to make origin field configurable, following set of changes are needed:

+ Expose a configurable option (Origin) in BGPaaS admin UI
+ Pass this value from UI to the configuration node and IF-MAP
+ From configuration node pass it to controller where BGP (core) implementation can access it.
+ If a user-specified value was provided, then use it otherwise follow existing logic

##3.1 Alternatives considered
Describe pros and cons of alternatives considered.
##3.2 API schema changes

**Configuration Changes:**

+ When used in the control node process, BGP derives its internal configuration from the network configuration distributed by the IFMAP server. This functionality is handled by the BgpConfigManager class.

+ The **first step** towards defining a new knob is to add it to the schema. OpenContrail auto-generates the **REST API** that stores the configuration and makes it available through the IF-MAP server. It also generates the **API client library** that is can be used to set the configuration parameters. The BGP related schema is present in **controller/src/schema/bgp_schema.xsd**.

**Changes in bgp_schema.xsd:**

+ Add a new XSD element called “bgp-origin” in the type BgpSessionAttributes. This is the data type that is associated with bgp peering sessions.

+ Execute the command **scons controller/src/api-lib**. This command builds the Python client api library that we will use later on to set the new configuration parameter. You can poke around at the generated code: **grep bgp-origin build/debug/api-lib/vnc_api/gen/**

+ Add bpp_origin in bgp_sess_attrs in **controller/src/config/utils/provision_bgp.py**.

##3.3 User workflow impact

Contrail GUI allows the user define a new route origin with multiple options. User can click advanced options in Create to view the BGP Origin field. It has four options: IGP, EGP, INCOMPLETE or NONE to be selected by the user.

##3.4 UI changes

Details in section 4.1 below.

##3.5 Notification impact

There were no changes made in logs, UVEs or alarms.



#4. Implementation
##4.1  Work items

It has 4 modules. The first module involves the changes in configuration files mentioned in section 3.2 above. The rest of the changes are mentioned below.

###4.1.1 UI changes

These steps are to be followed to make changes in contrail GUI to reflect the impact of modifications in schema:

+ Declare bgp_origin as optional field in file **webroot/common/api/jsonDiff.helper.js** in optFields.
+ Declare bgp_origin format in **webroot/config/services/bgpasaservice/ui/js/bgpAsAServiceFormatter.js**, which is called by frontend to show appropriate bgp origin value.  
+ In ContrailConfigModel, add bgp_origin in defaultConfig which is present in this file: **webroot/config/services/bgpasaservice/ui/js/models/bgpAsAServiceModel.js**.
String value from front end is converted into integer value to be sent to the backend. 
Then the value received at frontend is validated that whether it is 0, 1, 2 or 3. 
+ To add a new field on the GUI, the structure of a drop down menu is defined in **webroot/config/services/bgpasaservice/ui/js/views/bgpAsAServiceEditView.js**. This enables different options i.e. IGP, BGP, ICOMPLETE and NONE to be visible in the drop down menu at Edit View on GUI.
+ To make the BGP origin value visible in the Grid View, changes are made in **webroot/config/services/bgpasaservice/ui/js/views/bgpAsAServiceGridView.js**.	
+ The value of BGP origin is bonded with BGP origin formatter by making changes in “this.bgpOrigunViewFormattter” function.	

By making the above mentioned changes, the BGP Origin Field will become configurable in the UI.
On Front End, we get field of **BGP origin** in the tabs **Create**, **Edit** and **Grid view**. BGP origin field is also visible in the tab “BGP as a service.”  

An object is passed from front end to API Server when we create BGP as a service.

###4.1.2 Controller                                                                                                                 
Following changes are implemented in Controller to define a new origin field.                                 
####4.1.2.1 BGP Config:
+ **bgp_config.h:** In **bgp_config.h**, new attribute **bgp_origin** is added in **BgpNeighborConfig** class. For manipulation of this attribute, we have added a **getter/setter** in the same class.

+ **bgp_config.cc:** In **bgp_config.cc**, we call the setter method for **bgp_origin** defined in header file. The coding convention was followed and **bgp_origin** was added in **CopyValues** method and the same was done for **CompareTo** method.


####4.1.2.2 BGP Peer:

+ In **bgp_peer.h** the new attribute **bgp_origin** is added in **BgpPeer** class.

+ In the file **bgp_peer.cc**, the **RibExportPolicy** in the **BuildRibExportPolicy** methodreturns an additional argument which is **bgp_origin**.

####4.1.2.3 In BGPRibOut:

+ In **bgpRibout.h**, bgp origin function is defined which returns a constant value.

+ In **bgp_ribout.cc**, changes are made in the if statements of RibOut constructor.

####4.1.2.4 BgpRibOutPolicy:

+ In **bgp_rib_policy.h**, a new integer bgp origin is defined. 

+ **bgp_rib_policy.cc**: In the structure **RibExportPolicy**, we add the attribute **bgp_origin** so that origin attribute is advertised to all BGP Peers. In the structure **RibExportPolicy**, the attribute **bgp_origin** is set in the constructor method. As there are total 4 constructors for the structure **RibExportPolicy**, **bgp_origin** is set for the rest of 3 constructors. 

####4.1.2.5 BgpShowConfig:

+ **bgp_show_config.cc**: In the **FillBgpNeighborConfigInfo** method, we set the **bgp_origin** for **ShowBgpNeighborConfig** with the value of **BgpNeighborConfig bgp_origin**.

+ **bgp_peer.sandesh**: Declare bgp_origin in sandesh structure

+ In **bgp_config_ifmap.cc**, **bgp_origin** attribute is set. 

###4.1.3 Core files for BgpAttrOrigin:

####4.1.3.1 BgpAttrOrigin:

+ **bgp_attr_base.h:** The BgpAttribute class defines an enumeration of Code which contain the BGP Attributes.  Origin being a part of BGP is assigned value 1.

+ In **bgp_attr.h**, the structure BgpAttr inherits BgpAttribute. This structure contains methods and attributes for manipulating Origin.

+ The class BgpAttr contains a getter/setter for Origin.

####4.1.3.2 Bgp_attr.cc:

+ The declared methods in bgp_attr.h are implemented. A total of 3 different code flows are initiated within Contrail to set RouteOrigin attribute. **(1)** BGP Message Builder **(2)** Routing Instance **(3)** BGP XMPP RTarget Manager

####4.1.3.3 BgpXmppRtargetManager:
+ **bgp_xmpp_rtarget_manager.cc**: In the GetRouteTargetRouteAttr method, the origin is set with a initiated a value of IGP (defined in enum OriginType in struct BgpAttrOrigin).

####4.1.3.4 RoutingInstance:
+ **routing_instance.cc**: In RoutingInstance class, the method AddRTargetRoute sets the origin with a value of IGP.

####4.1.3.5 BgpMessageBuilder:
+ **bgp_message_builder.h**: In class BgpMessage, new private constants are defined. 
+ **bgp_message_builder.cc**: In BgpMessageBuilder class, the **StartReach** method has **RibOutAttr** type reference in the parameters. A BgpAttr type pointer is referenced to RibOutAttr attribute. 

###4.1.4 Checking condition for overriding Bgp Origin value

On creating BGPaas, we check if session.bgp_origin is not equal to 3. Then we override the current BGP origin. Otherwise, go with the default settings.

####4.1.4.1 bgp_message_builder.cc:

Check if value of bgp_origin is set by the user from 0 to 2. Override in this case. Otherwise go with the default behavior.

####4.1.4.2 bgp_xmpp_rtarget_manager.cc:

In this cc file, the override logic for bgp_origin is implemented.

#5. Performance and scaling impact
##5.1 API and control plane

There are no changes in scalability of API and Control Plane.
##5.2 Forwarding performance
We do not expect any change to the forwarding performance.

#6. Upgrade
The BGP origin field is a new field and hence does not have any upgrade impact.

#7. Deprecations
There are no deprecations when this change is made.

#8. Dependencies
There are no dependencies for this feature.

#9. Testing
##9.1 Unit test

GUI unit test: Check if values are visible on frontend and are passed to the backend.

IFMAP unit test: Check whether value passed from front end has been received on IFMAP server.

BGPaaS: Check that the value of BGP origin received can be overridden.


##9.2 Dev test

Flow Test Steps: 

+ Check if value of BGP origin is received from frontend.

+ Check if this value is received by IFMAP server at backend. 

+ Check that when BGPaaS is created, default (original) value is overridden by user-defined value.

These tests were completed successfully.

#10. Documentation Impact
BGP origin field details have to be added in user documentation.

#11. References
[bgp_design](http://juniper.github.io/contrail-vnc/bgp_design.html)

[adding-bgp-knob-to-opencontrail](http://www.opencontrail.org/adding-bgp-knob-to-opencontrail/)

[contrail-controller (source-code)](https://github.com/Juniper/contrail-controller/tree/master/src/vnsw/agent)
