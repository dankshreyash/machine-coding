CREATE TABLE Products (
    ProductId INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    CategoryId INT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);