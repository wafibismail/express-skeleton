//There are more ways to do it. I just chose the simplest one that comes to mind i.e. using unordered lists (ul)

//Consider these individual handlers one module because they're tightly coupled.
{
    DOM_HANDLER.init();
    HTTP_HANDLER.fetchCategories();
}