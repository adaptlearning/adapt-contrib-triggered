# adapt-contrib-triggered
An extension that hides components that can be triggered by a button.

[Visit the **Triggered** wiki](https://github.com/adaptlearning/adapt-contrib-triggered/wiki) for more information about its functionality and for explanations of key properties.

## Installation
* If **Triggered** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
    `adapt install adapt-contrib-triggered`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-triggered": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Triggered** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

<div float align=right><a href="#top">Back to Top</a></div>

## Settings overview

The attributes listed below are used in *components.json* to configure **Triggered**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-triggered/blob/master/example.json). The absence of the **_triggered** object in a component model is interpreted as having **Triggered** disabled (`"_isEnabled": false`).

The same **_triggered** object may be added to the course (*course.json*). At this level, `"_isEnabled"` can be used to disable **Triggered** on components that have `"_isEnabled": true`.  
>**Note:** Setting the **_triggered** object in *course.json* does not provide defaults for components. It cannot be used to enable **Triggered** on components that have `"_isEnabled": false` or that do not have the **_triggered** object in their model json.

Visit the [**Triggered** wiki](https://github.com/adaptlearning/adapt-contrib-triggered/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

### Attributes

**_triggered** (object): The Triggered object that contains values for **_isEnabled**, **_top**, **_left**, **showButtonText**, and **hideButtonText**.

>**_isEnabled** (boolean): Enables/disables the **Triggered** extension.

>**showButton** (object): This object contains values for **_top**, **_right**, **_bottom**, **_left** and **buttonText**.

>>**_top** (string): Top position of Triggered show button.

>>**_right** (string): Top position of Triggered show button.

>>**_bottom** (string): Left position of Triggered show button.

>>**_left** (string): Left position of Triggered show button.

>>**buttonText** (string): Show button text.

>**hideButton** (object): This object contains values for **_top**, **_right**, **_bottom**, **_left** and **buttonText**.

>>**_top** (string): Top position of Triggered hide button.

>>**_right** (string): Top position of Triggered hide button.

>>**_bottom** (string): Left position of Triggered hide button.

>>**_left** (string): Left position of Triggered hide button.

>>**buttonText** (string): Hide button text.

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.

## Browser spec

This component has been tested to the standard Adapt browser specification.
