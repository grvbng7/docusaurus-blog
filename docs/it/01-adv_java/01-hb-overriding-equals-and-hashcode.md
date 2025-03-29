---
description : when to override equals() and Hashcode() while using hibernate 
---

# when to override equals() and Hashcode() while using hibernate 

you only need to worry about it if your entity will be part of a Set or if you're going to be detaching/attaching its instances. The latter is not that common. The former is usually best handled via:
Basing `equals()` / `hashCode()` on a business key - e.g. a unique combination of attributes that is not going to change during the object (or, at least, session) lifetime.
The **important** part here is that you need to **reload** your Set after the new entity has been added to it and persisted ;  otherwise, you may end up with strange behavior (ultimately resulting in errors and/or data corruption) because your entity may be allocate to a bucket not matching its current `hashCode()`.  

**important note from Madhura Anturkar mam**  
We generally use Set\<> in ManytoMany relations to avoid duplicates , in such case you must always override equals and hashcode methods.

***Tip :*** Use unique keys eg: Project name , email etc for generating hashcode 
***Gavin King suggested not to use hibernate generated id as hashcode generator.***

