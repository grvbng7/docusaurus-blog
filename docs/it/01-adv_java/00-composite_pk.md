---
description: How to create composite primary key in hibernate  
---

# Composite Primary Key in hibernate
 A primary key class must be defined to represent a composite primary key. Composite primary keys typically arise when mapping from databases when the database key is comprised of several columns. 
***EmbeddedId*** and ***IdClass*** is used to denote composite Primary key .
The following rules apply for composite primary keys:
1. The primary key class must be public and must have a public no-arg constructor.
1. If property-based ( setter / getter based )  access is used, the properties ( setters / getters ) of the primary key class must be public or protected.
1. primary key class must be serializable.
1. primary key class must define ***equals()*** and ***hashcode()*** methods.
## With `@IdClass`  
```Java
public class TimePK implements Serializable {
    //if you want to set fields private,
    //you can write public / protected getters and setters instead 
    protected Integer levelStation; 
    protected Integer confPathID;

    public TimePK() {}

    public TimePK(Integer levelStation, Integer confPathID) {
        this.levelStation = levelStation;
        this.confPathID = confPathID;
    }
    // equals, hashCode
}

@Entity
@IdClass(TimePK.class)
class Time implements Serializable {
    @Id
    private Integer levelStation;
    @Id
    private Integer confPathID;

    private String src;
    private String dst;
    private Integer distance;
    private Integer price;

    // getters, setters
}
```
## With `EmbeddedId`  
```Java
@Embeddable
public class TimePK implements Serializable {
    protected Integer levelStation;
    protected Integer confPathID;

    public TimePK() {}

    public TimePK(Integer levelStation, Integer confPathID) {
        this.levelStation = levelStation;
        this.confPathID = confPathID;
    }
    // equals, hashCode
}

@Entity
class Time implements Serializable {
    @EmbeddedId
    private TimePK timePK;

    private String src;
    private String dst;
    private Integer distance;
    private Integer price;
    //...
}
```
***Personally, I preffer using @IdClass approach , because it makes your life easy if you needed to write JPQL having joins.***
