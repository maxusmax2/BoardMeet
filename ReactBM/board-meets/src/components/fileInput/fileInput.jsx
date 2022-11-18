import style from "./fileInput.module.css";
export const FileInput = () => {
    
    return(
        <div class="field__wrapper">
        <input  type="file"  id="field__file-2" class="field field__file" multiple/>   
        <label class="field__file-wrapper" for="field__file-2">
            <div class="field__file-fake">Файл не вбран</div>
            <div class="field__file-button">Выбрать</div>
        </label>  
    </div>
    );
}